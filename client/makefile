
install:
	@npm install

update:
	@npm update

build:
	@cd ./tools/gulp && gulp --gulpfile ./index.js build  --max-old-space-size=8192 ${ARGS}

beautify:
	@prettier --config ./configs/prettier.json --write ./sources/**/*.ts
	@prettier --config ./configs/prettier.json --write ./sources/**/*.tsx

clear:
	@rm -rf builds

