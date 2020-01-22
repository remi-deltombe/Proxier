import { Exchange } from "proxy";

export interface ExchangeFormInterface {
    exchange: Exchange;
    onExchangeChange?: (exchange: Exchange) => void;
}
