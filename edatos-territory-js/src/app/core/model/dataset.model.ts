import { Type } from "class-transformer";

import { InternationalString, Kind, SelfLink, StatisticalOperation } from "@app/core/model";

export class DatasetBase {
    public id!: string;
    public urn!: string;

    @Type(() => SelfLink)
    public selfLink!: SelfLink;

    @Type(() => InternationalString)
    public name!: InternationalString;

    public kind = Kind.DATASET;

    getName(lang: string): string | null {
        return this.name.get(lang);
    }
}

class DatasetMetadata {
    @Type(() => StatisticalOperation)
    statisticalOperation!: StatisticalOperation;
}

export class Dataset extends DatasetBase {
    @Type(() => InternationalString)
    public description!: InternationalString;

    @Type(() => DatasetMetadata)
    public metadata?: DatasetMetadata;
}

export class DatasetsDto {
    @Type(() => DatasetBase)
    public dataset!: DatasetBase[];

    public kind!: Kind;

    public total!: number;
    public limit!: number;
    public offset!: number;

    public selfLink!: string;
    public nextLink!: string;
    public lastLink!: string;
}
