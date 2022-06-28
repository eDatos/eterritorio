// allows type checking for typescript
import * as PROPERTIES from "../../../assets/properties.json";

type Properties = typeof PROPERTIES;
export { Properties };

export interface Territories {
    zones: Zone[];
}

export interface Zone {
    id: string;
    i18n_title: string;
    codes: (string | { id: string; i18n_title: string; children: string[] })[];
}
