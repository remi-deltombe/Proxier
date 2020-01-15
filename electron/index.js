const { app, BrowserWindow } = require("electron");
const {
	Application
} = require("./server/builds/components/application/application");

async function createServer() {
	const application = new Application();
	application.start("./client");
	return application;
}

async function createWindow() {
	let win = new BrowserWindow({ width: 800, height: 600 });
	win.on("closed", () => {
		win = null;
	});
	win.loadURL("http://localhost:8080/builds/bootstraps/client/index.html");
}

app.on("ready", async () => {
	const server = await createServer();
	const window = await createWindow();
});
