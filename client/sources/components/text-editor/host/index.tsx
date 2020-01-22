import * as React from "react";
import * as ReactDOM from "react-dom";

import { TextEditor } from "text-editor";

function Component(): JSX.Element {
	const [value, setValue] = React.useState<string>("test");

	return (
		<div>
			<TextEditor
				label="test2"
				value={value}
				rows={20}
				onChange={value => setValue(value)}
			/>
		</div>
	);
}

ReactDOM.render(<Component />, document.getElementById("APP"));
