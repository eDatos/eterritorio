import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, catchError, forkJoin, map, of, retry, shareReplay, switchMap, tap } from "rxjs";

import { MetadataPropertyDto } from "@app/core/model";
import { instantiate } from "@app/core/service";
import { ConfigService } from "@app/core/service/config/config.service";

/**
 * Provides the already loaded values from common-metadata. This service *must* be initialized
 * before the app starts. Please sde {@link init} method documentation.
 */
@Injectable({
    providedIn: "root",
})
export class MetadataService {
    private properties: any;
    private commonMetadataUrl!: string;

    constructor(private http: HttpClient, private configService: ConfigService) {}

    /**
     * Initialize app properties. To be run with APP_INITIALIZER.
     *
     * @see https://angular.io/api/core/APP_INITIALIZER
     *
     * @example Initializing the service at app start. Code to be located in {@link AppModule} providers array.
     * {
     *      provide: APP_INITIALIZER,
     *      useFactory: (ms: MetadataService) => () => ms.init(),
     *      deps: [MetadataService],
     *      multi: true,
     * }
     *
     * @return an observable that completes after all properties are loaded.
     */
    init(): Observable<any> {
        console.log("Loading app properties...");

        return this.configService.getProperties().pipe(
            switchMap((props) => {
                console.log("Properties file loaded");
                this.commonMetadataUrl = props.endpoints.cmetadata.url;

                const properties$ = {
                    statisticalResourcesExternalApiUrl: this.requestKeyValue(
                        props.keys.statisticalResources.rest.external
                    ),
                    visualizerWebUrl: this.requestKeyValue(props.keys.visualizer.web.external),
                    layoutHeaderUrl: this.requestKeyValue(props.keys.layout.header),
                    layoutFooterUrl: this.requestKeyValue(props.keys.layout.footer),
                };

                // load all properties at the same time
                return forkJoin(properties$).pipe(tap((res) => (this.properties = res)));
            })
        );
    }

    requestKeyValue(key: string): Observable<string | Error> {
        return this.http.get(this.commonMetadataUrl + "/properties/" + key).pipe(
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

    getLayoutFooterUrl(): string {
        return this.properties.layoutFooterUrl;
    }

    getStatisticalResourcesExternalApiUrl(): string {
        return this.properties.statisticalResourcesExternalApiUrl;
    }

    getVisualizerWebUrl(): string {
        return this.properties.visualizerWebUrl;
    }
}
