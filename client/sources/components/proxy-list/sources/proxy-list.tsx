import * as React from "react";

import { Proxy } from "proxy";
import { Endpoint } from "api";
import { Button } from "button";
import { MultiTab } from "multi-tab";

export interface ProxyListInterface {
    active?: Proxy;
    proxies: Proxy[];
    onAdd: () => void;
    onClick: (proxy: Proxy) => void;
}

export function ProxyList(config: ProxyListInterface): JSX.Element {
    const { active, proxies, onClick, onAdd } = config;

    return (
        <MultiTab
            items={[
                {
                    element: <Button onClick={() => onAdd()} text={"+"} />
                },
                ...proxies.map(proxy => ({
                    text: proxy.url,
                    active: proxy === active,
                    onClick: () => onClick(proxy)
                }))
            ]}
        />
    );
}
