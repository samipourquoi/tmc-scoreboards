{-# LANGUAGE OverloadedStrings #-}

import Web.Scotty
import Network.Wai.Middleware.Static
import Data.Scoreboards (generateDatabase)
import Control.Monad

main :: IO ()
main = do
    db <- generateDatabase ["endtech"]

    scotty 3000 $ do
        -- static content
        get "/" $ file "dist/index.html"
        middleware $ staticPolicy $ addBase "dist"

        -- api
        get "/api/:server/:objective" $ do
            server <- param "server"
            objective <- param "objective"
            text $ server <> " " <> objective
