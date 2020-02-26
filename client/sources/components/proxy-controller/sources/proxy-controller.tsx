import * as React from "react";

import { Api, Endpoint } from "api";
import { ProxyCreate } from "proxy-create";
import { ProxyList } from "proxy-list";
import { ProxyDetail } from "proxy-detail";
import { Proxy, Exchange } from "proxy";

export interface ProxyControllerInterface {
    api: Api;
}

export function ProxyController(config: ProxyControllerInterface): JSX.Element {
    const { api } = config;
    const [proxyEndpoint, setProxyEndpoint] = React.useState<Endpoint<Proxy>>(
        undefined
    );
    const [exchangeEndpoint, setExchangeEndpoint] = React.useState<
        Endpoint<Exchange>
    >(undefined);

    const [proxy, setProxy] = React.useState(undefined);
    const [proxies, setProxies] = React.useState([]);
    const [exchanges, setExchanges] = React.useState([]);

    function handleOnCreate(proxy: Proxy) {
        proxyEndpoint.create(proxy);
    }

    function refreshProxies(focus?: Proxy) {
        setProxies(proxyEndpoint?.getInstances() ?? []);
        setProxy(focus ?? proxy);
    }

    function refreshExchanges() {
        setExchanges(exchangeEndpoint?.getInstances() ?? []);
    }

    React.useEffect(() => {
        setExchangeEndpoint(proxy?.exchangeEndpoint(api) ?? undefined);
    }, [proxy]);

    React.useEffect(() => {
        setProxyEndpoint(api.registerEndpoint("proxies", Proxy));
    }, [api]);

    React.useEffect(() => {
        if (proxyEndpoint) {
            const registrations = [
                proxyEndpoint.onCreate.subscribe(created =>
                    refreshProxies(created)
                ),
                proxyEndpoint.onUpdate.subscribe(updated =>
                    refreshProxies(proxy ?? updated)
                ),
                proxyEndpoint.onDelete.subscribe(proxy => refreshProxies()),
                proxyEndpoint.onList.subscribe(proxies =>
                    refreshProxies(proxy ?? proxies[0])
                )
            ];

            proxyEndpoint.list();

            return () =>
                registrations.forEach(registration =>
                    registration.unsubscribe()
                );
        }
    }, [proxyEndpoint]);

    React.useEffect(() => {
        if (exchangeEndpoint) {
            const registrations = [
                exchangeEndpoint.onGet.subscribe(exchange =>
                    refreshExchanges()
                ),
                exchangeEndpoint.onCreate.subscribe(exchange =>
                    refreshExchanges()
                ),
                exchangeEndpoint.onUpdate.subscribe(exchange =>
                    refreshExchanges()
                ),
                exchangeEndpoint.onDelete.subscribe(exchange =>
                    refreshExchanges()
                ),
                exchangeEndpoint.onList.subscribe(exchanges =>
                    refreshExchanges()
                )
            ];

            exchangeEndpoint.list();

            return () =>
                registrations.forEach(registration =>
                    registration.unsubscribe()
                );
        }
    }, [exchangeEndpoint]);

    return (
        <>
            <ProxyList
                active={proxy}
                proxies={proxies}
                onClick={proxy => setProxy(proxy)}
                onAdd={() => setProxy(undefined)}
            />
            {proxy && (
                <ProxyDetail
                    proxy={proxy}
                    exchanges={exchanges}
                    onExchangeChange={exchange =>
                        exchangeEndpoint.update(exchange)
                    }
                    onExchangeGet={exchange => exchangeEndpoint.get(exchange)}
                />
            )}
            {!proxy && <ProxyCreate onCreate={handleOnCreate} />}
        </>
    );
}
