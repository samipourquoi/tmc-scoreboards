FROM haskell:8

WORKDIR /usr/src/app

RUN cabal update

COPY . .

RUN stack setup

RUN stack install --only-dependencies -j4 server

CMD [ "stack", "run", "server" ]
