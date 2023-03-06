install:
	npm install

start:
	npx babel-node -- src/bin/gendiff.js

publish:
	npm publish

lint:
	npx eslint .

test:
	npm test

test-watch:
	npm run test-watch

test-coverage:
	npm test -- --coverage
