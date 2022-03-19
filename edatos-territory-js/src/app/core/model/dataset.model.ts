import { Type } from "class-transformer";

import { InternationalString, Kind, SelfLink } from "@app/core/model";

export class Dataset {
    public id!: string;
    public urn!: string;

    @Type(() => SelfLink)
    public selfLink!: SelfLink;

    @Type(() => InternationalString)
    public name!: InternationalString;

    public kind = Kind.DATASET;
}

export class DatasetsDto {
    @Type(() => Dataset)
    public dataset!: Dataset[];

    public kind!: Kind;

    public total!: number;
    public limit!: number;
    public offset!: number;

    public selfLink!: string;
    public nextLink!: string;
    public lastLink!: string;
}
