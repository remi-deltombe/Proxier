
build:
	@rm -rf ./server
	@rm -rf ./client
	mkdir ./server
	mkdir ./client
	cp -r ./../server/node_modules/* ./node_modules/
	cp -r ./../server/builds ./server/builds
	cp -r ./../client/builds ./client/builds
	cp -r ./../client/node_modules ./client/node_modules
	electron --disable-gpu .

run:
	electron --disable-gpu .

release:
	electron-builder 