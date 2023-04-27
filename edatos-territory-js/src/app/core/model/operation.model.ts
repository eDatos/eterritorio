import { Type } from "class-transformer";

import { InternationalString, Kind, SelfLink } from "@app/core/model";

export class StatisticalOperation {
    public id!: string;
    public urn!: string;

    @Type(() => InternationalString)
    public name!: InternationalString;

    public kind = Kind.OPERATION;

    getName(lang: string): string | null {
        return this.name.get(lang);
    }
    constructor(id: string, urn: string, name: InternationalString) {
        this.id = id;
        this.urn = urn;
        this.name = name;
    }
}
