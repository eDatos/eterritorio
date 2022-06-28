// allows type checking for typescript
import * as PROPERTIES from "../../../assets/properties.json";

type Properties = typeof PROPERTIES;
export { Properties };

export interface Territories {
    groups: Group[];
}

export interface Group {
    id: string;
    children: { id: string; codes?: string[] }[];
}
