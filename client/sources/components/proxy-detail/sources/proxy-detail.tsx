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
}

interface ProxyDetailTableRowInterface extends TableRowInterface {
    exchange: Exchange;
}

export function ProxyDetail(config: ProxyDetailInterface) {
    const { proxy, exchanges } = config;

    const link = `http://${proxy.hostname}:${proxy.port}`;
    const rows = exchanges.map(exchangeToRow);

    function exchangeToRow(exchange: Exchange): ProxyDetailTableRowInterface {
        return {
            exchange,
            items: [
                { text: exchange.method },
                { text: exchange.url },
                {
                    element: (
                        <Button
                            text={exchange.cached ? "Disable" : "Enable"}
                            onClick={() => {
                                exchange.cached = !exchange.cached;
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
                            { text: "Method" },
                            { text: "Request" },
                            {
                                element: (
                                    <>
                                        <Button
                                            text="Enable all"
                                            onClick={() =>
                                                rows.forEach(row => {
                                                    row.exchange.cached = true;
                                                })
                                            }
                                        />
                                        <Button
                                            text="Disable all"
                                            onClick={() =>
                                                rows.forEach(row => {
                                                    row.exchange.cached = false;
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
