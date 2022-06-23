import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, shareReplay, switchMap } from "rxjs";

import { Properties } from "@app/core/config";

@Injectable({
    providedIn: "root",
})
export class ConfigService {
    static PROPERTIES_FILE_URL = "assets/properties.json";

    private properties$ = this.http.get<Properties>(ConfigService.PROPERTIES_FILE_URL).pipe(shareReplay(1));

    constructor(private http: HttpClient) {}

    /**
     * Request to get the app properties.
     * @return object of properties.
     * @see ConfigService.PROPERTIES_FILE_URL
     */
    getProperties(): Observable<Properties> {
        return this.properties$;
    }

    /**
     * Returns a list of territories, separated by layers, one of which is usually displayed on the main page.
     */
    getTerritories(): Observable<any> {
        return this.getProperties().pipe(
            switchMap((properties) => {
                return this.http.get(`assets/territories/${properties.config.territoryNutsCode.toLowerCase()}.json`);
            })
        );
    }
}
