{-# LANGUAGE OverloadedStrings #-}

import Web.Scotty

main :: IO ()
main = scotty 3000 $
    get "/" $ do
        html $ mconcat ["<h1>Scotty, ", "test", " me up!</h1>"]