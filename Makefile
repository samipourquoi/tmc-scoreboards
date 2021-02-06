error:
	@echo "Please use one the following targets: all, client, server, docker, clean"

all: client server

docker: client
	docker build -t i-tmc-scoreboard .

client: dist
dist: node_modules
	rm -rf dist
	npx parcel build src/client/index.html

# because of https://github.com/mfine/heroku-buildpack-stack
install: server
server:
	stack build --fast --copy-bins

node_modules:
	npm ci

clean:
	rm -rf dist .cache .stack-work
