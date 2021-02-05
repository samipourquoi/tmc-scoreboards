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
    db <- generateDatabase ["endtech","litetech"]
    let onObjectiveRequest = databaseLookup db

    scotty 3000 $ do
        -- api
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
