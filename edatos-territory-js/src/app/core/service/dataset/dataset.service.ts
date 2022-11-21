import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { Resources } from "@app/core/model";
import { PropertiesService, instantiate } from "@app/core/service";

export interface DatasetQuery {
    territoryName: string;
    limit: number;
    offset: number;
}

@Injectable({
    providedIn: "root",
})
export class DatasetService {
    public static REST_URL: string;

    constructor(private http: HttpClient, private propertiesService: PropertiesService) {
        DatasetService.REST_URL =
            this.propertiesService.getStatisticalResourcesExternalApiUrl() + "/v1.0";
    }

    getDatasetsByTerritoryVariableElementId(variableElementId: string): Observable<Resources> {
        const url = `${DatasetService.REST_URL}/resources.json?query=GEOCOV_VARELEM_ID eq '${variableElementId}'&limit=1000`;
        return this.http.get(url /**/).pipe(instantiate(Resources));
    }
}
