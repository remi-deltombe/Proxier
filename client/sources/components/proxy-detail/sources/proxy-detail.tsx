/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";

import { Registration } from "event";
import { Button, ButtonColor } from "button";
import { InputText } from "input-text";
import { Table, TableRowInterface } from "table";
import { Link } from "link";
import { Api, Endpoint } from "api";
import { Proxy, Exchange } from "proxy";
import { ExchangeTable } from "exchange-table";
import { style } from "./styles";

export interface ProxyDetailInterface {
    proxy: Proxy;
    exchanges: Exchange[];
    onExchangeChange?: (exchange: Exchange) => void;
}

interface ProxyDetailTableRowInterface extends TableRowInterface {
    exchange: Exchange;
}

export function ProxyDetail(config: ProxyDetailInterface) {
    const { proxy } = config;

    const link = `http://${proxy.hostname}:${proxy.port}`;

    return (
        <div css={style}>
            <div className="header">
                <div className="from">
                    <Link text={proxy.url} link={proxy.url} blank={true} />
                </div>
                <div className="arrow">></div>
                <div className="to">
                    <Link text={link} link={link} blank={true} />
                </div>
            </div>
            <ExchangeTable {...config} />
        </div>
    );
}
