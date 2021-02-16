{-# LANGUAGE OverloadedStrings #-}

import Web.Scotty
import Network.Wai.Middleware.Static ( addBase, staticPolicy )
import Data.Scoreboards
import Data.Aeson.Types
import Control.Monad.IO.Class (liftIO)
import System.Environment

instance ToJSON Entry where
    toJSON (Entry _ user score _) = 
        object [
            "user" .= user,
            "score" .= score
        ]

getPort :: IO Int
getPort = do
  port <- lookupEnv "PORT"
  return $ case port of
    Just p  -> read p
    Nothing -> 3000

main :: IO ()
main = do
  db <- generateDatabase ["endtech","litetech","wavetech","lunaar"]
  let onObjectiveRequest = databaseLookup db
  port <- getPort

  scotty port $ do
    -- api
    get "/api/random" $ do
      objective <- liftIO . randomObjective $ db
      json $ object [ "random" .= objective ]

    get "/api/:objective" $ do
      objective <- param "objective"
      json $ onObjectiveRequest objective Nothing

    get "/api/:objective/:server" $ do
      objective <- param "objective"
      server <- param "server"
      json $ onObjectiveRequest objective (
          if server == "global"
              then Nothing
              else Just server)

    -- static content
    get "/" $ file "dist/index.html"
    middleware $ staticPolicy $ addBase "dist"
