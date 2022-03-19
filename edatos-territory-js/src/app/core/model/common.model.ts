import { Type } from "class-transformer";

export enum Kind {
    DATASET = "statisticalResources#dataset",
    DATASETS = "statisticalResources#datasets",
}

export class SelfLink {
    public kind: Kind;
    public href: string;

    constructor(kind: Kind, href: string) {
        this.kind = kind;
        this.href = href;
    }
}

export class InternationalString {
    @Type(() => LocalisedString)
    public text!: LocalisedString[];

    get(lang: string): string | null {
        return this.text?.find(elem => elem.lang.toLowerCase() === lang.toLowerCase())?.value || null;
    }
}

export class LocalisedString {
    public value: string;
    public lang: string;

    constructor(lang: string, value: string) {
        this.lang = lang;
        this.value = value;
    }
}
