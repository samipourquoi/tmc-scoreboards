{-# LANGUAGE OverloadedStrings #-}

import Web.Scotty
import Network.Wai.Middleware.Static ( addBase, staticPolicy )
import Data.Scoreboards
import Control.Monad
import Data.Aeson.Types

instance ToJSON Entry where
    toJSON (Entry _ user score _) = 
        object [
            "user" .= user,
            "score" .= score
        ]

main :: IO ()
main = do
    db <- generateDatabase ["endtech"]
    let onObjectiveRequest = databaseLookup db

    scotty 3000 $ do
        -- api
        get "/api/:objective" $ do
            objective <- param "objective"
            let entries = onObjectiveRequest objective Nothing
            json entries

        get "/api/:objective/:server" $ do
            objective <- param "objective"
            server <- param "server"
            let entries = onObjectiveRequest objective (Just server)
            json entries

        -- static content
        get "/" $ file "dist/index.html"
        middleware $ staticPolicy $ addBase "dist"
