
install:
	@npm install

update:
	@npm update

build:
	echo ${ARGS}
	@cd ./tools/gulp && gulp --gulpfile ./index.js build  --max-old-space-size=8192  ${ARGS}
	
clear:
	@rm -rf builds

