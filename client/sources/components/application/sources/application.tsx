import * as React from "react";
import * as ReactDOM from "react-dom";
import { ProxyController } from "proxy-controller";
import { Api } from "api";

export class Application {
	private api = new Api();

	public start() {
		ReactDOM.render(
			<ProxyController api={this.api} />,
			document.getElementById("APP")
		);
	}
}

let app: Application = new Application();
app.start();

