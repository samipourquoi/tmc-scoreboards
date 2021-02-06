{-# LANGUAGE OverloadedStrings #-}

import Web.Scotty
import Network.Wai.Middleware.Static ( addBase, staticPolicy )
import Data.Scoreboards
import Data.Aeson.Types
import Control.Monad.IO.Class (liftIO)

instance ToJSON Entry where
    toJSON (Entry _ user score _) = 
        object [
            "user" .= user,
            "score" .= score
        ]

main :: IO ()
main = do
  db <- generateDatabase ["endtech","litetech"]
  let onObjectiveRequest = databaseLookup db

  scotty 80 $ do
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
