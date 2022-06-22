import { Type } from "class-transformer";

import { InternationalString, Kind, SelfLink } from "@app/core/model";

export class StatisticalOperation {
    public id!: string;
    public urn!: string;

    @Type(() => SelfLink)
    public selfLink!: SelfLink;

    @Type(() => InternationalString)
    public name!: InternationalString;

    public kind = Kind.OPERATION;

    getName(lang: string): string | null {
        return this.name.get(lang);
    }
}

export class OperationsDto {
    @Type(() => StatisticalOperation)
    public operation!: StatisticalOperation[];

    public kind!: Kind;

    public total!: number;
    public limit!: number;
    public offset!: number;

    public selfLink!: string;
    public nextLink?: string;
    public lastLink?: string;
}
