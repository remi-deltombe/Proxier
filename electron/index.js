const fs = require("fs");
const { app, BrowserWindow } = require("electron");
const {
	Application
} = require("./sources/server/builds/components/application/application");

async function createServer() {
	const application = new Application();
	application.start({
		clientPath: __dirname + "/../extraResources"
	});
	return application;
}

async function createWindow(application) {
	let win = new BrowserWindow({ width: 800, height: 600 });

	console.log(application.port);
	win.on("closed", () => {
		win = null;
	});
	win.loadURL("http://127.0.0.1:" + application.port + "/builds/bootstraps/client/index.html");
}

app.on("ready", async () => {
	const server = await createServer();
	const window = await createWindow(server);
});
