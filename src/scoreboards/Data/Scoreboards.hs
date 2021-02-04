module Data.Scoreboards
(   Entry (Entry),
    Database,
    readFromCSV,
    generateDatabase,
    databaseLookup ) where

import qualified Data.Map as Map
import Text.CSV (parseCSVFromFile)
import System.FilePath.Posix (takeBaseName)
import Data.Sort (sortBy)

data Entry = Entry { serverEntry    :: String,
                     userEntry      :: String,
                     valueEntry     :: Integer,
                     objectiveEntry :: String }
    deriving (Show)

type Database = [Entry]

readFromCSV :: FilePath -> IO Database
readFromCSV path = do
    content <- parseCSVFromFile path
    return $ case content of
        Left err -> []
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

generateDatabase :: [String] -> IO Database
generateDatabase s = do
    nestedScoreboards <- mapM (readFromCSV . toFileName) s
    return $ concat nestedScoreboards
    where
        toFileName s = "data/" ++ s ++ ".csv"

databaseLookup :: Database -> String -> Maybe String -> [Entry]
databaseLookup db objectiveLookup maybeServerLookup =
    sortBy sortEntries . filter filterObjective . filter filterServer $ db

    where 
        filterServer :: Entry -> Bool
        filterServer entry = 
            case maybeServerLookup of
                Just serverLookup -> serverEntry entry == serverLookup
                Nothing           -> True

        filterObjective :: Entry -> Bool
        filterObjective entry = objectiveEntry entry == objectiveLookup

        sortEntries :: Entry -> Entry -> Ordering
        sortEntries e1 e2 = compare (valueEntry e2) (valueEntry e1)
