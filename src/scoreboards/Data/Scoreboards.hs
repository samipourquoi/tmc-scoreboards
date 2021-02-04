module Data.Scoreboards
(   Scoreboard,
    readFromCSV,
    generateDatabase ) where

import qualified Data.Map as Map
import           Text.CSV (parseCSVFromFile)

data Scoreboard = Scoreboard String Integer String
    deriving (Show)

readFromCSV :: FilePath -> IO [Scoreboard]
readFromCSV path = do
    content <- parseCSVFromFile path
    return $ case content of
        Left err -> []
        Right content -> map readRow content
    where
        readRow :: [String] -> Scoreboard
        readRow (name : value : objective : _) = Scoreboard name (read value) objective

generateDatabase :: [String] -> IO [Scoreboard]
generateDatabase s = do
    nestedScoreboards <- mapM (readFromCSV . toFileName) s
    return $ concat nestedScoreboards
    where
        toFileName s = "data/" ++ s ++ ".csv"
