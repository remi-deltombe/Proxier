
install:
	@npm install

update:
	@npm update

build:
	@cd ./tools/gulp && gulp --gulpfile ./index.js build  --max-old-space-size=8192

beautify:
	@prettier --config ./configs/prettier.json --write ./sources/**/*.ts
	
clear:
	@rm -rf builds
	
run:
	@node .

