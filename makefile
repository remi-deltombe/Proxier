
install:
	@cd ./client && make install
	@cd ./server && make install

update:
	@cd ./client && make update
	@cd ./server && make update

build:
	@cd ./client && make build
	@cd ./server && make build
	
run-server: build
	@cd ./server && node .1

clear:
	@cd ./client && make clear
	@cd ./server && make clear
