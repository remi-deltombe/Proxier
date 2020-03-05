import * as React from "react";

import { Registration } from "event";
import { Button, ButtonColor } from "button";
import { InputText } from "input-text";
import { Table, TableRowInterface, TableSortState } from "table";
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
    const [filterSort, setFilterSort] = React.useState<{
        field: string;
        type?: TableSortState;
        getter?: (value: any) => any;
    }>({ field: "" });

    const [headers, setHeaders] = React.useState(buildHeaders());
    const [rows, setRows] = React.useState([]);

    const regexp = [buildRegExp(filterMethod), buildRegExp(filterRequest)];

    React.useEffect(() => {
        setHeaders(buildHeaders());
        setRows(sort(filter(exchanges)).map(exchangeToRow));
    }, [exchanges, filterMethod, filterRequest, filterSort]);

    function sort(exchanges: Exchange[]): Exchange[] {
        const { field, getter, type } = filterSort;

        const invertSort = (fn: (a: any, b: any) => number) => {
            return (a: any, b: any) => fn(a, b) * -1;
        };
        const sortByField = (a: any, b: any) => {
            if (a[field] > b[field]) return 1;
            if (a[field] < b[field]) return -1;
            return 0;
        };
        const sortByGetter = (a: number, b: number) => {
            if (getter(a) > getter(b)) return 1;
            if (getter(a) < getter(b)) return -1;
            return 0;
        };

        switch (type) {
            case TableSortState.ASC:
                exchanges = exchanges.sort(getter ? sortByGetter : sortByField);
                break;
            case TableSortState.DESC:
                exchanges = exchanges.sort(
                    invertSort(getter ? sortByGetter : sortByField)
                );
                break;
        }
        return exchanges;
    }

    function filter(exchanges: Exchange[]): Exchange[] {
        return exchanges.filter(
            exchange =>
                regexp[0].test(exchange.method) && regexp[1].test(exchange.url)
        );
    }

    function sortBy(
        field: string,
        getter = (value: any) => value[field]
    ): TableSortState {
        const filter = filterSort;
        if (filter.field != field) {
            filter.field = field;
            filter.type = TableSortState.NONE;
            filter.getter = getter;
        }

        switch (filter.type) {
            case TableSortState.NONE:
                filter.type = TableSortState.ASC;
                break;
            case TableSortState.ASC:
                filter.type = TableSortState.DESC;
                break;
            case TableSortState.DESC:
                filter.type = TableSortState.NONE;
                break;
        }

        setFilterSort({ ...filter });
        return filter.type;
    }

    function buildHeaders() {
        return [
            {
                key: "titles",
                items: [
                    {
                        text: "ID",
                    },
                    {
                        text: "Method",
                        width: "60px",
                        sortable: true,
                        sortState:
                            filterSort.field == "method"
                                ? filterSort.type
                                : TableSortState.NONE,
                        onSort: () => sortBy("method")
                    },
                    {
                        text: "Request",
                        sortable: true,
                        sortState:
                            filterSort.field == "url"
                                ? filterSort.type
                                : TableSortState.NONE,
                        onSort: () => sortBy("url")
                    },
                    {
                        text: "Last request",
                        sortable: true,
                        sortState:
                            filterSort.field == "requestedAt"
                                ? filterSort.type
                                : TableSortState.NONE,
                        onSort: () =>
                            sortBy("requestedAt", t =>
                                t.requestedAt.timestamp()
                            )
                    },
                    { text: "Cache", width: "200px" }
                ]
            },
            {
                key: "filters",
                items: [
                    {
                    },
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
                    {},
                    {
                        element: (
                            <div>
                                <Button
                                    text="Enable"
                                    onClick={() =>
                                        rows.forEach(row => {
                                            row.exchange.cached = true;
                                            onExchangeChange(row.exchange);
                                        })
                                    }
                                />
                                <Button
                                    text="Disable"
                                    onClick={() =>
                                        rows.forEach(row => {
                                            row.exchange.cached = false;
                                            onExchangeChange(row.exchange);
                                        })
                                    }
                                />
                            </div>
                        )
                    }
                ]
            }
        ];
    }

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
                { text: exchange.uuid.toString() },
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
            <Table headers={headers} rows={rows} />
        </div>
    );
}
