all: client server

docker: client
	docker build -t i-tmc-scoreboard .

client: dist
dist: node_modules
	rm -rf dist
	npx parcel build src/client/index.html

server:
	stack build --fast

install: node_modules
node_modules:
	npm ci

clean:
	rm -rf dist .cache .stack-work
