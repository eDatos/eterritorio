import { Injectable } from "@angular/core";

import { AppProperties } from "@app/core/config";

@Injectable({
    providedIn: "root",
})
export class ConfigService {
    constructor() {}

    getProperties(): AppProperties {
        return ConfigService.window.configuration;
    }

    private static get window(): any {
        return window;
    }
}
