/** @jsx jsx */
import { jsx } from "@emotion/core";

import * as React from "react";
import { InputText } from "input-text";
import {
    TableRowItemInterface,
    TableRowInterface,
    TableHeaderItemInterface,
    TableInterface
} from "./interfaces";
import { style } from "./styles";

export function TableRowItem(config: TableRowItemInterface) {
    return (
        <td>
            {config.text}
            {config.element}
        </td>
    );
}

export function TableRow(config: TableRowInterface) {
    const { items, onClick = () => {} } = config;
    return (
        <tr
            onClick={() => onClick()}
            className={config.onClick ? "is-clickable" : ""}
        >
            {items.map((item, i) => (
                <TableRowItem key={i} {...item} />
            ))}
        </tr>
    );
}

export function TableHeaderItem(config: TableHeaderItemInterface) {
    return (
        <th {...config}>
            {config.text}
            {config.element}
        </th>
    );
}

export function TableHeader(config: TableRowInterface) {
    return (
        <tr>
            {config.items.map((item, i) => (
                <TableHeaderItem key={i} {...item} />
            ))}
        </tr>
    );
}

export function Table(config: TableInterface) {
    return (
        <table css={style}>
            {config.headers && (
                <thead>
                    {config.headers.map(header => (
                        <TableHeader key={header.key} {...header} />
                    ))}
                </thead>
            )}
            {config.rows && (
                <tbody>
                    {config.rows.map(row => (
                        <TableRow key={row.key} {...row} />
                    ))}
                </tbody>
            )}
            {config.footers && (
                <tfoot>
                    {config.footers.map(row => (
                        <TableRow key={row.key} {...row} />
                    ))}
                </tfoot>
            )}
        </table>
    );
}
