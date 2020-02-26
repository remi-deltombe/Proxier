export enum ButtonColor {
    DEFAULT,
    GREEN,
    RED
}

export interface ButtonInterface {
    text: string;
    color?: ButtonColor;
    onClick?: () => void;
}
