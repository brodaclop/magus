export interface Attribute {
    name: string;
    display: string;
    effect: Array<{
        targetAttribute: string;
        value: number;
    }>
}