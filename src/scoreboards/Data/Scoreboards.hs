module Data.Scoreboards
(   Entry (Entry),
    Database,
    readFromCSV,
    generateDatabase,
    databaseLookup,
    randomObjective ) where

import Text.CSV (parseCSVFromFile)
import System.FilePath.Posix (takeBaseName)
import Data.List
import Data.Aeson.Types
import Data.Time.Clock.POSIX (getPOSIXTime)

data Entry = Entry { serverEntry    :: String,
                     userEntry      :: String,
                     valueEntry     :: Integer,
                     objectiveEntry :: String }
    deriving (Show, Eq)

type Database = [Entry]

readFromCSV :: FilePath -> IO Database
readFromCSV path = do
    csvFile <- parseCSVFromFile path
    return $ case csvFile of
        Left        _ -> []
        Right content -> map readRow content
    where
        readRow :: [String] -> Entry
        readRow (user : value : objective : _) = 
            Entry {
                serverEntry=takeBaseName path,
                userEntry=user,
                valueEntry=read value,
                objectiveEntry=objective
            }
        readRow _ = Entry "unknown" "unknown" 0 "m-air"

generateDatabase :: [String] -> IO Database
generateDatabase s = do
    nestedScoreboards <- mapM (readFromCSV . toFileName) s
    return $ concat nestedScoreboards
    where
        toFileName f = "data/" ++ f ++ ".csv"

randomObjective :: Database -> IO String
randomObjective [] = return []
randomObjective db = do
  index <- randomIndex
  return $ objectiveList !! index
  where
    objectiveList :: [String]
    objectiveList = map objectiveEntry $ db

    randomIndex :: IO Int
    randomIndex = ((\i -> i `mod` length objectiveList) . round) <$> getPOSIXTime


databaseLookup :: Database -> String -> Maybe String -> [Entry]
databaseLookup db objectiveLookup maybeServerLookup =
    sortBy sortEntries . mergeEntries . filterEntries $ db
    where
        filterEntries :: Database -> [Entry]
        filterEntries = filter filterObjective . filter filterServer

        filterServer :: Entry -> Bool
        filterServer entry = 
            case maybeServerLookup of
                Just serverLookup -> serverEntry entry == serverLookup
                Nothing           -> True

        filterObjective :: Entry -> Bool
        filterObjective entry = objectiveEntry entry == objectiveLookup

        mergeEntries :: [Entry] -> [Entry]
        mergeEntries = addScores . groupByUser
            where
                groupByUser :: [Entry] -> [[Entry]]
                groupByUser [] = []
                groupByUser list = nub [
                  filter (\entry -> userEntry entry == userEntry x) list
                  | x <- list ]

                addScores :: [[Entry]] -> [Entry]
                addScores [] = []
                addScores list = [
                  Entry server user scoreSum objective
                  | x@((Entry server user _ objective) : _) <- list,
                  let scoreSum = foldl (\a e -> valueEntry e + a) 0 x ]

        sortEntries :: Entry -> Entry -> Ordering
        sortEntries e1 e2 = compare (valueEntry e2) (valueEntry e1)
