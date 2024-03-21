import { Type } from "class-transformer";

import { InternationalString, Kind, SelfLink, StatisticalOperation } from "@app/core/model";

export class Resource {
    public id!: string;
    public urn!: string;

    @Type(() => InternationalString)
    public name!: InternationalString;

    getName(lang: string): string | null {
        return this.name.get(lang);
    }

    public visualizerHtmlLink!: string;

    @Type(() => SelfLink)
    public selfLink!: SelfLink;

    public kind = Kind.DATASET;
}

export class ResourceWithStatisticalOperation extends Resource {
    @Type(() => StatisticalOperation)
    public statisticalOperation!: StatisticalOperation;
}

export class ResourceWithSubjectArea extends Resource {
    @Type(() => Resource)
    public subjectArea!: Resource;
}

export class Resources {
    public kind!: Kind;

    public total!: number;
    public limit!: number;
    public offset!: number;

    public selfLink!: string;
    public nextLink!: string;
    public lastLink!: string;
}

export class ResourcesWithStatisticalOperation extends Resources {
    @Type(() => ResourceWithStatisticalOperation)
    public resource!: ResourceWithStatisticalOperation[];
}

const Omit = <T, K extends keyof T>(Class: new () => T, keys: K[]): new () => Omit<T, (typeof keys)[number]> => Class;

export class ResourcesWithStatisticalOperationNoHateoas extends Omit(ResourcesWithStatisticalOperation, [
    "limit",
    "offset",
    "selfLink",
    "nextLink",
    "lastLink",
]) {}

export class OperationsWithSubjectArea extends Resources {
    @Type(() => ResourceWithSubjectArea)
    public operation!: ResourceWithSubjectArea[];
}
