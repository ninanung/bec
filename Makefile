BUILD_CD = frontend/
SERVER_CD = server/

build: 
	echo Install npm modules and build
	cd $(BUILD_CD) && npm install && npm run build

just-build:
	cd $(BUILD_CD) && npm run build

copy:
	cp -R ./frontend/build ./server

start:
	cd $(SERVER_CD) && npm start

build-and-copy: | build copy

just-build-and-copy: | just-build copy

fisrt-start-server: | build-and-copy start

start-server: | just-build-and-copy start