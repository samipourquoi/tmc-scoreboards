{-# LANGUAGE OverloadedStrings #-}

import Web.Scotty
import Network.Wai.Middleware.Static
import Data.Scoreboards

main :: IO ()
main = do
  putStrLn readData

  scotty 3000 $ do
    -- static content
    get "/" $ file "dist/index.html"
    middleware $ staticPolicy $ addBase "dist"

    -- api
    get "/api/:server/:objective" $ do
      server <- param "server"
      objective <- param "objective"
      text $ server <> " " <> objective
