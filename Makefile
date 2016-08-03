install:
	@if [ ! -f "$$(which nodemon)" ]; then npm --registry=http://registry.npm.taobao.org install nodemon -g; fi
	@npm --registry=http://registry.npm.taobao.org install

dev: install
	@rm -rf dist
	@eslint --fix app.js route.js src/**/*.js test/**/*.js
	@nodemon muti.js

deploy:
	@babel src --out-dir dist

publish: deploy
	@npm publish
