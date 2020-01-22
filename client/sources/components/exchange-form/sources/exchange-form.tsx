import * as React from "react";

import { Button, ButtonColor } from "button";
import { InputText } from "input-text";
import { Table, TableRowInterface } from "table";
import { Link } from "link";
import { Api, Endpoint } from "api";
import { Proxy, Exchange } from "proxy";
import { ExchangeFormInterface } from "./interfaces";

export function ExchangeForm(config: ExchangeFormInterface) {
    const { exchange, onExchangeChange = () => {} } = config;

    /*
    public url: string = "";
    public method: string = "";
    publiec cached: boolean = true;
    */

    return (
        <div>
            <InputText label="url" value={exchange.url} />
            <InputText label="method" value={exchange.method} />
        </div>
    );
}
