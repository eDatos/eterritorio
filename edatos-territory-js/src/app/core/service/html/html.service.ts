import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { ConfigService } from "@app/core/service";

export interface EDatosPropertiesResponse {
    property: { key: string; value: string }[];
    total: number;
}

@Injectable({
    providedIn: "root",
})
export class HtmlService {
    constructor(private http: HttpClient, private configService: ConfigService) {}

    getConfigValue(value: string): Observable<EDatosPropertiesResponse> {
        return this.http.get(value) as Observable<EDatosPropertiesResponse>;
    }

    getHeaderHtml(): Observable<string> {
        // const key = this.configService.getProperties().layout.headerUrlKey;
        // return this.getConfigValue(
        //     `https://estadisticas.arte-consultores.com/cmetadata/v1.0/properties?query=KEY EQ "${key}"`
        // ).pipe(mergeMap((headerHtmlUrl) => this.http.get(headerHtmlUrl.property[0].value, { responseType: "text"
        // })));
        return this.http.get(
            "https://estadisticas.arte-consultores.com/apps/organisations/istac/common/header/header.html",
            {
                headers: { "Content-Type": "text/plain" },
                responseType: "text",
            }
        );
    }
}
