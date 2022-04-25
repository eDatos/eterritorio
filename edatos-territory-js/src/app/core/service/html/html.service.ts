import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, switchMap } from "rxjs";

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

    getHeaderHtml(): Observable<string> {
        return this.configService.getLayoutHeaderUrl().pipe(
            switchMap((url) =>
                this.http.get(url, {
                    headers: { "Content-Type": "text/plain" },
                    responseType: "text",
                })
            )
        );
    }
}
