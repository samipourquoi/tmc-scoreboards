all: install client server

client:
	npx parcel build src/client/index.html

server:
	stack build --fast --pedantic

install: node_modules

node_modules:
	npm ci
