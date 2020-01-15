import * as React from "react";

import { Registration } from "event";
import { Button, ButtonColor } from "button";
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

    const [filterMethod, setFilterMethod] = React.useState<string>("");
    const [filterRequest, setFilterRequest] = React.useState<string>("");

    const link = `http://${proxy.hostname}:${proxy.port}`;
    const regexp = [buildRegExp(filterMethod), buildRegExp(filterRequest)];
    const rows = exchanges
        .filter(
            exchange =>
                regexp[0].test(exchange.method) && regexp[1].test(exchange.url)
        )
        .map(exchangeToRow);

    function buildRegExp(input: string): RegExp {
        return new RegExp(input.length ? input.split("*").join(".*") : ".*");
    }

    function exchangeToRow(exchange: Exchange): ProxyDetailTableRowInterface {
        return {
            exchange,
            key: exchange.uuid,
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
                        <>
                            <Button
                                text={"Cache"}
                                onClick={() => {
                                    window.open(exchange.url, "_blank");
                                }}
                            />
                            <Button
                                text={exchange.cached ? "Disable" : "Enable"}
                                color={
                                    exchange.cached
                                        ? ButtonColor.GREEN
                                        : ButtonColor.RED
                                }
                                onClick={() => {
                                    exchange.cached = !exchange.cached;
                                    onExchangeChange(exchange);
                                }}
                            />
                        </>
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
                        key: "titles",
                        items: [
                            { text: "Method", width: "1px" },
                            { text: "Request" },
                            { text: "Cache", width: "200px" }
                        ]
                    },
                    {
                        key: "filters",
                        items: [
                            {
                                element: (
                                    <InputText
                                        value={filterMethod}
                                        onChange={v => setFilterMethod(v)}
                                    />
                                )
                            },
                            {
                                element: (
                                    <InputText
                                        value={filterRequest}
                                        onChange={v => setFilterRequest(v)}
                                    />
                                )
                            },
                            {
                                element: (
                                    <>
                                        <Button
                                            text="Enable"
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
                                            text="Disable"
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
