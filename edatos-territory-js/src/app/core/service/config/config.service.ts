import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { Properties } from "@app/core/config";

@Injectable({
    providedIn: "root",
})
export class ConfigService {
    private static PROPERTIES_FILE_URL = "assets/properties.json";

    constructor(private http: HttpClient) {}

    getProperties(): Observable<Properties> {
        return this.http.get<Properties>(ConfigService.PROPERTIES_FILE_URL);
    }
}
