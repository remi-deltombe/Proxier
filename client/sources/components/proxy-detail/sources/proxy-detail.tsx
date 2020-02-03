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
import { ExchangeForm } from "exchange-form";
import { style } from "./styles";

export interface ProxyDetailInterface {
    proxy: Proxy;
    exchanges: Exchange[];
    onExchangeGet?: (exchange: Exchange) => void;
    onExchangeChange?: (exchange: Exchange) => void;
}

interface ProxyDetailTableRowInterface extends TableRowInterface {
    exchange: Exchange;
}

export function ProxyDetail(config: ProxyDetailInterface) {
    const {
        proxy,
        onExchangeGet = (e: Exchange) => e,
        onExchangeChange
    } = config;

    const link = `http://${proxy.hostname}:${proxy.port}`;
    const [exchange, setExchange] = React.useState<Exchange>(undefined);

    return (
        <div css={style}>
            <div className="header">
                <div className="from">
                    <Link text={link} link={link} blank={true} />
                </div>
                <div className="arrow">></div>
                <div className="to">
                    <Link text={proxy.url} link={proxy.url} blank={true} />
                </div>
            </div>
            <div className="content">
                <div className="list">
                    <div className="title">Requests</div>
                    <ExchangeTable
                        {...config}
                        onExchangeChange={exchange =>
                            onExchangeChange(exchange)
                        }
                        onExchangeFocus={async exchange => {
                            onExchangeGet(exchange);
                            setExchange(exchange);
                        }}
                    />
                </div>
                {exchange && (
                    <div className="form">
                        <div className="title">Edit request</div>
                        <ExchangeForm
                            exchange={exchange}
                            onExchangeChange={exchange =>
                                onExchangeChange(exchange)
                            }
                            onClose={() => {
                                setExchange(undefined);
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
