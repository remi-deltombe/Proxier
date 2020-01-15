import * as React from "react";

import { Proxy } from "proxy";
import { Endpoint } from "api";
import { Button } from "button";

export interface ProxyListInterface {
    //endpoint: Endpoint<Proxy>;
    proxies: Proxy[];
    onAdd: () => void;
    onClick: (proxy: Proxy) => void;
}

export function ProxyList(config: ProxyListInterface): JSX.Element {
    const { proxies, onClick, onAdd } = config;

    function renderItem(proxy: Proxy): JSX.Element {
        return <Button onClick={() => onClick(proxy)} text={proxy.url} />;
    }

    function renderAddButton(): JSX.Element {
        return <Button onClick={() => onAdd()} text={"+"} />;
    }

    return (
        <>
            {proxies.map(proxy => renderItem(proxy))}
            {renderAddButton()}
        </>
    );
}
