
build:
	@rm -rf ./sources
	mkdir ./sources
	mkdir ./sources/server
	mkdir ./sources/client
	cp -r ./../server/node_modules/* ./node_modules/
	cp -r ./../server/builds ./sources/server/builds
	cp -r ./../client/builds ./sources/client/builds
	cp -r ./../client/node_modules ./sources/client/node_modules
	electron --disable-gpu .

run:
	electron --disable-gpu .

release:
	electron-builder -l AppImage