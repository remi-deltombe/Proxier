import * as React from "react";

import { Proxy } from "proxy";
import { Button } from "button";
import { InputText } from "input-text";

export interface ProxyCreateInterface {
    onCreate: (proxy: Proxy) => void;
}

export function ProxyCreate(config: ProxyCreateInterface): JSX.Element {
    const { onCreate } = config;
    const [url, setUrl] = React.useState<string>("http://");

    return (
        <>
            <InputText label="Url" value={url} onChange={v => setUrl(v)} />
            <Button text="Create" onClick={() => onCreate(new Proxy(url))} />
        </>
    );
}
