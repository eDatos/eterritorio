import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, map } from "rxjs";

import { properties } from "@app/core/config";
import { MetadataPropertyDto } from "@app/core/model";
import { instantiate } from "@app/core/service";

@Injectable({
    providedIn: "root",
})
export class ConfigService {
    constructor(private http: HttpClient) {}

    requestKeyValue(key: string): Observable<string> {
        return this.http.get(ConfigService.commonMetadataUrl + "/properties/" + key).pipe(
            instantiate(MetadataPropertyDto),
            map((res) => res.value)
        );
    }

    getLayoutHeaderUrl(): Observable<string> {
        return this.requestKeyValue(ConfigService.layoutHeaderKey);
    }

    private static get layoutHeaderKey(): string {
        return properties.metadata.layout.header;
    }

    private static get commonMetadataUrl(): string {
        return properties.endpoints.cmetadata.url;
    }
}
