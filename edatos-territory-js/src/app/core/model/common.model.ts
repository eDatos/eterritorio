import { Type } from "class-transformer";

export enum Kind {
    DATASET = "statisticalResources#dataset",
    DATASETS = "statisticalResources#datasets",
    PROPERTY = "commonMetadata#property",
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

    /**
     * Returns the value in the specified language.
     * @param lang Language code according to ISO 639‑1.
     */
    get(lang: string): string | null {
        return this.text?.find((elem) => elem.lang.toLowerCase() === lang.toLowerCase())?.value || null;
    }
}

export class LocalisedString {
    public lang!: string;
    public value!: string | null;
}
