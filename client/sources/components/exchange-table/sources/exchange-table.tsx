import * as React from "react";

import { Registration } from "event";
import { Button, ButtonColor } from "button";
import { InputText } from "input-text";
import { Table, TableRowInterface } from "table";
import { Link } from "link";
import { Api, Endpoint } from "api";
import { Proxy, Exchange } from "proxy";

export interface ExchangeTableInterface {
    exchanges: Exchange[];
    onExchangeChange?: (exchange: Exchange) => void;
    onExchangeFocus?: (exchange: Exchange) => void;
}

interface ExchangeTableRowInterface extends TableRowInterface {
    exchange: Exchange;
}

export function ExchangeTable(config: ExchangeTableInterface) {
    const {
        exchanges,
        onExchangeChange = () => {},
        onExchangeFocus = () => {}
    } = config;

    const [filterMethod, setFilterMethod] = React.useState<string>("");
    const [filterRequest, setFilterRequest] = React.useState<string>("");

    const regexp = [buildRegExp(filterMethod), buildRegExp(filterRequest)];
    const rows = exchanges
        .filter(
            exchange =>
                regexp[0].test(exchange.method) && regexp[1].test(exchange.url)
        )
        .map(exchangeToRow);

    function buildRegExp(input: string): RegExp {
        try {
            return new RegExp(
                input.length ? input.split("*").join(".*") : ".*"
            );
        } catch (e) {
            return new RegExp(".*");
        }
    }

    function exchangeToRow(exchange: Exchange): ExchangeTableRowInterface {
        return {
            exchange,
            key: exchange.uuid,
            onClick: () => onExchangeFocus(exchange),
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
                { text: exchange.requestedAt.format() },
                {
                    element: (
                        <div>
                            <Button
                                text={exchange.cached ? "Enable" : "Disable"}
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
                        </div>
                    )
                }
            ]
        };
    }

    return (
        <div>
            <Table
                headers={[
                    {
                        key: "titles",
                        items: [
                            { text: "Method", width: "60px" },
                            { text: "Request" },
                            { text: "Last request" },
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
                                    <div>
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
                                    </div>
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
