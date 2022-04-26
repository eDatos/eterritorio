import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, catchError, forkJoin, map, of, retry, shareReplay, tap } from "rxjs";

import { properties } from "@app/core/config";
import { MetadataPropertyDto } from "@app/core/model";
import { instantiate } from "@app/core/service";

@Injectable({
    providedIn: "root",
})
export class ConfigService {
    private properties$ = {
        statisticalResourcesExternalApiUrl: this.requestKeyValue(properties.keys.statisticalResources.rest.external),
        layoutHeaderUrl: this.requestKeyValue(properties.keys.layout.header),
    };

    private properties: any;

    constructor(private http: HttpClient) {}

    init(): Observable<any> {
        console.log("Loading app properties...");

        // load all properties at the same time
        return forkJoin(this.properties$).pipe(tap((res) => (this.properties = res)));
    }

    requestKeyValue(key: string): Observable<string | Error> {
        return this.http.get(ConfigService.commonMetadataUrl + "/properties/" + key).pipe(
            instantiate(MetadataPropertyDto),

            retry({ count: 2, delay: 2000 }), // try two more times after error, each request 2 seconds after previous
            shareReplay(1), // cache last value, no new request needed for the same property

            map((res) => res.value),
            tap({
                next: () => console.debug(`Prop '${key}' loaded`),
                error: (err) => console.error(`Could not load property '${key}'`, err),
            }),

            catchError(() => of(new Error(key)))
        );
    }

    getLayoutHeaderUrl(): string {
        return this.properties.layoutHeaderUrl;
    }

    getStatisticalResourcesExternalApiUrl(): string {
        return this.properties.statisticalResourcesExternalApiUrl;
    }

    private static get commonMetadataUrl(): string {
        return properties.endpoints.cmetadata.url;
    }
}
