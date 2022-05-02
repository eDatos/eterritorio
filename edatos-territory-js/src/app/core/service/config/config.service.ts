import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { Properties } from "@app/core/config";

@Injectable({
    providedIn: "root",
})
export class ConfigService {
    static PROPERTIES_FILE_URL = "assets/properties.json";

    constructor(private http: HttpClient) {}

    /**
     * Request to get the app properties.
     * @return object of properties.
     * @see ConfigService.PROPERTIES_FILE_URL
     */
    getProperties(): Observable<Properties> {
        return this.http.get<Properties>(ConfigService.PROPERTIES_FILE_URL);
    }
}
