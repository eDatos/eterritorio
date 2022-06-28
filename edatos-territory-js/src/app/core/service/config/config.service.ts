import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, shareReplay } from "rxjs";

import { Properties, Territories } from "@app/core/config";

@Injectable({
    providedIn: "root",
})
export class ConfigService {
    static PROPERTIES_FILE_URL = "assets/properties.json";
    static TERRITORIES_FILE_URL = "assets/territories/territories.json";

    private properties$ = this.http.get<Properties>(ConfigService.PROPERTIES_FILE_URL).pipe(shareReplay(1));
    private territories$ = this.http.get<Territories>(ConfigService.TERRITORIES_FILE_URL).pipe(shareReplay(1));

    constructor(private http: HttpClient) {}

    getProperties(): Observable<Properties> {
        return this.properties$;
    }

    getTerritories(): Observable<Territories> {
        return this.territories$;
    }
}
