import { Kind } from "@app/core/model/common.model";

export class MetadataPropertyDto {
    key!: string;
    value!: string;
    kind = Kind.PROPERTY;
}
