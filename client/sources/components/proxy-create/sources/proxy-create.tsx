/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";

import { Proxy } from "proxy";
import { Button } from "button";
import { InputText } from "input-text";

export interface ProxyCreateInterface {
    onCreate: (proxy: Proxy) => void;
}

const style = css`
    padding-top: 14px;

    label {
        width: 300px;

        .label,
        input {
            width: 300px;
        }
    }
`;

export function ProxyCreate(config: ProxyCreateInterface): JSX.Element {
    const { onCreate } = config;
    const [url, setUrl] = React.useState<string>("http://");

    return (
        <div css={style}>
            <InputText label="Url" value={url} onChange={v => setUrl(v)} />
            <Button text="Create" onClick={() => onCreate(new Proxy(url))} />
        </div>
    );
}
