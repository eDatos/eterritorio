import { Type } from "class-transformer";

import { InternationalString, Kind, SelfLink, ItemBase } from "@app/core/model";

export class Resource {

    public urn!: string;

    @Type(() => InternationalString)
    public name!: InternationalString;

    getName(lang: string): string | null {
        return this.name.get(lang);
    }

    @Type(() => ItemBase)
    public resourceId!: ItemBase;

    public visualizerHtmlLink!: string;
    
    @Type(() => SelfLink)
    public selfLink!: SelfLink;

    @Type(() => ItemBase)
    public statisticalOperation!: ItemBase;

    public kind = Kind.DATASET;
}


export class Resources {
    @Type(() => Resource)
    public resource!: Resource[];

    public kind!: Kind;

    public total!: number;
    public limit!: number;
    public offset!: number;

    public selfLink!: string;
    public nextLink!: string;
    public lastLink!: string;
}
