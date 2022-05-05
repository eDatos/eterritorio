import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { PropertiesService } from "@app/core/service";

@Injectable({
    providedIn: "root",
})
export class HtmlService {
    constructor(private http: HttpClient, private propertiesService: PropertiesService) {}

    getHeaderHtml(): Observable<string> {
        return this.http.get(this.propertiesService.getLayoutHeaderUrl(), {
            headers: { "Content-Type": "text/plain" },
            responseType: "text",
        });
    }

    getFooterHtml(): Observable<string> {
        return this.http.get(this.propertiesService.getLayoutFooterUrl(), {
            headers: { "Content-Type": "text/plain" },
            responseType: "text",
        });
    }
}
