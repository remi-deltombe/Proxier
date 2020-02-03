/** @jsx jsx */
import { jsx } from "@emotion/core";

import * as React from "react";

import { Button } from "button";
import { InputText } from "input-text";
import { TextEditor } from "text-editor";
import { Table, TableRowInterface } from "table";
import { ExchangeFormInterface } from "./interfaces";
import { style } from "./styles";

export function ExchangeForm(config: ExchangeFormInterface) {
    const { exchange, onExchangeChange = () => {} } = config;
    const { request, response } = exchange.exchange ?? {};

    const [body, setBody] = React.useState<string>(response?.body ?? "");
    const [header, setHeader] = React.useState<Map<string, string>>(new Map());
    const [rows, setRows] = React.useState<TableRowInterface[]>([]);

    const [newKey, setNewKey] = React.useState<string>("");
    const [newValue, setNewValue] = React.useState<string>("");

    React.useEffect(() => {
        setBody(response?.body ?? body);
        setHeader(response?.header ?? new Map());
    }, [response]);

    React.useEffect(() => {
        setRows(buildRows());
    }, [header]);

    function handleSave() {
        exchange.exchange.response.body = body;
        exchange.exchange.response.header = header;
        onExchangeChange(exchange);
    }

    function handleSetHeader(
        key: string,
        value: { key: string; value: string }
    ) {
        header.set(value.key, value.value);
        setHeader(new Map(header));
    }

    function handleAddHeader(value: { key: string; value: string }) {
        header.set(value.key, value.value);
        setHeader(new Map(header));
    }

    function handleRemoveHeader(key: string) {
        response.header.delete(key);
        setHeader(new Map(header));
    }

    function buildRow({
        key,
        value
    }: {
        key: string;
        value: string;
    }): TableRowInterface {
        return {
            key: key,
            items: [
                {
                    element: (
                        <InputText
                            value={key}
                            onChange={v =>
                                handleSetHeader(key, { key: v, value })
                            }
                        />
                    )
                },
                {
                    element: (
                        <InputText
                            value={value}
                            onChange={v =>
                                handleSetHeader(key, { key, value: v })
                            }
                        />
                    )
                },
                {
                    element: (
                        <Button
                            text="Remove"
                            onClick={() => handleRemoveHeader(key)}
                        />
                    )
                }
            ]
        };
    }

    function buildRows(): TableRowInterface[] {
        const rows = [];
        for (const [key, value] of header) {
            rows.push(buildRow({ key, value }));
        }
        return rows;
    }

    return (
        <div css={style()}>
            <Button text="Save" onClick={() => handleSave()} />

            <hr />
            <div className="label">Header</div>
            <Table
                headers={[
                    {
                        key: "header",
                        items: [{ text: "Key" }, { text: "Value" }, {}]
                    }
                ]}
                footers={[
                    {
                        key: "footer",
                        items: [
                            {
                                element: (
                                    <InputText
                                        value={newKey}
                                        onChange={value => setNewKey(value)}
                                    />
                                )
                            },
                            {
                                element: (
                                    <InputText
                                        value={newValue}
                                        onChange={value => setNewValue(value)}
                                    />
                                )
                            },
                            {
                                element: (
                                    <Button
                                        text="add"
                                        onClick={() => {
                                            handleAddHeader({
                                                key: newKey,
                                                value: newValue
                                            });
                                            setNewKey("");
                                            setNewValue("");
                                        }}
                                    />
                                )
                            }
                        ]
                    }
                ]}
                rows={rows}
            />

            <TextEditor
                label="Body"
                value={body}
                onChange={value => setBody(value)}
                rows={30}
            />
        </div>
    );
}
