import * as React from "react";

import { Proxy } from "proxy";
import { Endpoint } from "api";

export interface ProxyListInterface {
    //endpoint: Endpoint<Proxy>;
    proxies: Proxy[];
    onAdd: () => void;
    onClick: (proxy: Proxy) => void;
}

export function ProxyList(config: ProxyListInterface): JSX.Element {
    const { proxies, onClick, onAdd } = config;

    function renderItem(proxy: Proxy): JSX.Element {
        return <div onClick={() => onClick(proxy)}>{proxy.url}</div>;
    }

    function renderAddButton(): JSX.Element {
        return <div onClick={e => onAdd()}>+</div>;
    }

    return (
        <>
            {proxies.map(proxy => renderItem(proxy))}
            {renderAddButton()}
        </>
    );
}
