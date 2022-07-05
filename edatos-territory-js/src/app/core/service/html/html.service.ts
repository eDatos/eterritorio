import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { EMPTY, Observable } from "rxjs";

import { PropertiesService } from "@app/core/service";

@Injectable({
    providedIn: "root",
})
export class HtmlService {
    constructor(private http: HttpClient, private propertiesService: PropertiesService) {}

    getHeaderHtml(): Observable<string> {
        return this.getComponentByUrl(this.propertiesService.getLayoutHeaderUrl());
    }

    getFooterHtml(): Observable<string> {
        return this.getComponentByUrl(this.propertiesService.getLayoutFooterUrl());
    }

    private getComponentByUrl(url: string): Observable<string> {
        // Url checking was implemented because in some instances you would get from common-metadata
        // a value like, i.e., "FILL_ME" for the url footer, instead of a valid url (in dev environments).
        // And that would cause an infinite loop: a request to app.domain.com/FILL_ME is made (instead of
        // a request to another.domain.com/footer-url), DefaultController responds with index.html, app
        // restarts and loads footer, start again.
        if (HtmlService.validUrl(url)) {
            return this.http.get(url, {
                headers: { "Content-Type": "text/plain" },
                responseType: "text",
            });
        } else {
            console.error(`Invalid url: ${url}`);
            return EMPTY;
        }
    }

    private static validUrl(url: string): boolean {
        let valid = true;
        try {
            if (url) {
                let validUrl = new URL(url);
                if (validUrl.host == "" && validUrl.origin == "null") {
                    valid = false;
                }
            }
        } catch {
            valid = false;
        }
        return valid;
    }
}
