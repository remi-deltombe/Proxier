import * as React from "react";

import { Registration } from "event";
import { Button } from "button";
import { InputText } from "input-text";
import { Table, TableRowInterface } from "table";
import { Link } from "link";
import { Api, Endpoint } from "api";
import { Proxy, Exchange } from "proxy";

export interface ProxyDetailInterface {
    proxy: Proxy;
    exchanges: Exchange[];
    onExchangeChange?: (exchange: Exchange) => void;
}

interface ProxyDetailTableRowInterface extends TableRowInterface {
    exchange: Exchange;
}

export function ProxyDetail(config: ProxyDetailInterface) {
    const { proxy, exchanges, onExchangeChange = () => {} } = config;

    const link = `http://${proxy.hostname}:${proxy.port}`;
    const rows = exchanges.map(exchangeToRow);

    function exchangeToRow(exchange: Exchange): ProxyDetailTableRowInterface {
        return {
            exchange,
            items: [
                { text: exchange.method },
                {
                    element: (
                        <Link
                            text={exchange.url}
                            link={exchange.url}
                            blank={true}
                        />
                    )
                },
                {
                    element: (
                        <Button
                            text={exchange.cached ? "Disable" : "Enable"}
                            onClick={() => {
                                exchange.cached = !exchange.cached;
                                onExchangeChange(exchange);
                            }}
                        />
                    )
                }
            ]
        };
    }

    return (
        <div>
            <Link text={link} link={link} blank={true} />
            ->
            <Link text={proxy.url} link={proxy.url} blank={true} />
            <hr />
            <Table
                headers={[
                    {
                        items: [
                            { text: "Method", width: "1px" },
                            { text: "Request" },
                            {
                                width: "200px",
                                element: (
                                    <>
                                        <Button
                                            text="Enable all"
                                            onClick={() =>
                                                rows.forEach(row => {
                                                    row.exchange.cached = true;
                                                    onExchangeChange(
                                                        row.exchange
                                                    );
                                                })
                                            }
                                        />
                                        <Button
                                            text="Disable all"
                                            onClick={() =>
                                                rows.forEach(row => {
                                                    row.exchange.cached = false;
                                                    onExchangeChange(
                                                        row.exchange
                                                    );
                                                })
                                            }
                                        />
                                    </>
                                )
                            }
                        ]
                    }
                ]}
                rows={rows}
            />
        </div>
    );
}
