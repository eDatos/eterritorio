import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, catchError, forkJoin, map, of, retry, shareReplay, switchMap, tap } from "rxjs";

import { MetadataPropertyDto } from "@app/core/model";
import { ConfigService, instantiate } from "@app/core/service";

/**
 * Provides the already loaded values from common-metadata. This service *must* be initialized
 * before the app starts. Please sde {@link init} method documentation.
 *
 *
 * **HOW TO ADD NEW PROPERTIES**
 *
 * Theres a JSON file in the assets folder, <code>properties.json</code>, that contains the
 * *key* of the properties the app needs to load. When the app is deployed that file is fetched (HTTP)
 * and those keys then are used to request their respective values.
 *
 * However, that file is also locally imported to provide static type-checking. So, to add a property:
 *
 * 1. Add the property key in the properties.json file.
 * 2. Load the property in {@link init} method using {@link requestMetadataKeyValue}.
 * 3. Create a getter for the property.
 */
@Injectable({
    providedIn: "root",
})
export class PropertiesService {
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

                /**
                 * Add here the values that you need from the config file.
                 */
                this.commonMetadataUrl = props.endpoints.cmetadata.url;

                /**
                 * Add here the properties you need to request to common-metadata.
                 */
                const metadataProperties$ = {
                    organisation: this.requestMetadataKeyValue(props.keys.organisation),
                    statisticalResourcesExternalApiUrl: this.requestMetadataKeyValue(
                        props.keys.statisticalResources.rest.external
                    ),
                    statisticalOperationsExternalApiUrl: this.requestMetadataKeyValue(
                        props.keys.statisticalOperations.rest.external
                    ),
                    visualizerWebUrl: this.requestMetadataKeyValue(props.keys.visualizer.web.external),
                    layoutHeaderUrl: this.requestMetadataKeyValue(props.keys.layout.header),
                    layoutFooterUrl: this.requestMetadataKeyValue(props.keys.layout.footer),
                };

                // load all properties at the same time
                return forkJoin(metadataProperties$).pipe(tap((res) => (this.properties = res)));
            })
        );
    }

    requestMetadataKeyValue(key: string): Observable<string | Error> {
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

    getStatisticalOperationsExternalApiUrl(): string {
        return this.properties.statisticalOperationsExternalApiUrl;
    }

    getVisualizerWebUrl(): string {
        return this.properties.visualizerWebUrl;
    }

    getOrganization() {
        return this.properties.organisation;
    }

    getTerritoriesList() {
        // TODO(EDATOS-3675)
        return [
            "CCAA_CANARIAS",
            "PROV_LAS_PALMAS",
            "PROV_SANTA_CRUZ_TENERIFE",
            "ISLA_LA_PALMA",
            "ISLA_HIERRO",
            "ISLA_GOMERA",
            "ISLA_TENERIFE",
            "ISLA_GRAN_CANARIA",
            "ISLA_FUERTEVENTURA",
            "ISLA_LANZAROTE",
            "ISLA_GRACIOSA",
            "MUN_ADEJE",
            "MUN_ARAFO",
            "MUN_ARICO",
            "MUN_ARONA",
            "MUN_BUENAVISTA_NORTE",
            "MUN_CANDELARIA",
            "MUN_FASNIA",
            "MUN_GARACHICO",
            "MUN_GRANADILLA_ABONA",
            "MUN_GUANCHA",
            "MUN_GUIA_ISORA",
            "MUN_GUIMAR",
            "MUN_ICOD_VINOS",
            "MUN_MATANZA_ACENTEJO",
            "MUN_OROTAVA",
            "MUN_PUERTO_CRUZ",
            "MUN_REALEJOS",
            "MUN_ROSARIO",
            "MUN_SANTA_CRUZ_TENERIFE",
            "MUN_SANTA_URSULA",
            "MUN_SANTIAGO_TEIDE",
            "MUN_SAN_CRISTOBAL_LAGUNA",
            "MUN_SAN_JUAN_RAMBLA",
            "MUN_SAN_MIGUEL_ABONA",
            "MUN_SAUZAL",
            "MUN_SILOS",
            "MUN_TACORONTE",
            "MUN_TANQUE",
            "MUN_TEGUESTE",
            "MUN_VICTORIA_ACENTEJO",
            "MUN_VILAFLOR_CHASNA",
        ];
    }
}
