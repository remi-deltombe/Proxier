import * as React from "react";

import { Button, ButtonColor } from "button";
import { InputText } from "input-text";
import { TextEditor } from "text-editor";
import { Table, TableRowInterface } from "table";
import { Link } from "link";
import { Api, Endpoint } from "api";
import { Proxy, Exchange } from "proxy";
import { ExchangeFormInterface } from "./interfaces";

export function ExchangeForm(config: ExchangeFormInterface) {
    const { exchange, onExchangeChange = () => {} } = config;
    const { request, response } = exchange.exchange ?? {};

    const [body, setBody] = React.useState<string>(response?.body ?? "");

    React.useEffect(() => {
        setBody(response?.body ?? body);
    }, [response]);

    function handleSave() {
        exchange.exchange.response.body = body;
        onExchangeChange(exchange);
    }

    return (
        <div>
            <Button text="Save" onClick={() => handleSave()} />
            <InputText label="url" value={exchange.url} />
            <InputText label="method" value={exchange.method} />
            <TextEditor
                label="Body"
                value={body}
                onChange={value => setBody(value)}
                rows={30}
            />
        </div>
    );
}
