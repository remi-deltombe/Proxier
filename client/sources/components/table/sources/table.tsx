import * as React from "react";
import {
    TableRowItemInterface,
    TableRowInterface,
    TableInterface
} from "./interfaces";

export function TableRowItem(config: TableRowItemInterface) {
    return (
        <td>
            {config.text}
            {config.element}
        </td>
    );
}

export function TableRow(config: TableRowInterface) {
    return (
        <tr>
            {config.items.map((item, i) => (
                <TableRowItem key={i} {...item} />
            ))}
        </tr>
    );
}

export function TableHeaderItem(config: TableRowItemInterface) {
    return (
        <th>
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
        <table>
            <thead>
                {config.headers.map((header, i) => (
                    <TableHeader key={i} {...header} />
                ))}
            </thead>
            <tbody>
                {config.rows.map((row, i) => (
                    <TableRow key={i} {...row} />
                ))}
            </tbody>
        </table>
    );
}
