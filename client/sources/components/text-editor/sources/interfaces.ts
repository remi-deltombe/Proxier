export interface TextEditorInterface {
    label?: string;
    value: string;
    onChange?: (value: string) => void;
    rows?: number;
}
