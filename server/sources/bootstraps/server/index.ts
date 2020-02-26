import { Application } from "../../components/application/application";

const app = new Application();
app.start({
	clientPath : '../client',
	port: 8080
});
