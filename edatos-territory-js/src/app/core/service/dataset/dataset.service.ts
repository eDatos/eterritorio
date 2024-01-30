import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { ResourcesWithStatisticalOperation } from "@app/core/model";
import { PropertiesService, instantiate } from "@app/core/service";

@Injectable({
    providedIn: "root",
})
export class DatasetService {
    public static REST_URL: string;
    private static LIMIT: string = "100000";

    constructor(private http: HttpClient, private propertiesService: PropertiesService) {
        DatasetService.REST_URL = this.propertiesService.getStatisticalResourcesExternalApiUrl() + "/v1.0";
    }

    getDatasetsByTerritoryVariableElementId(variableElementId: string): Observable<ResourcesWithStatisticalOperation> {
        const url = `${DatasetService.REST_URL}/resources.json?query=GEOCOV_VARELEM_ID eq '${variableElementId}' AND IS_LAST_VERSION EQ 'true'&limit=${DatasetService.LIMIT}`;
        return this.http.get(url).pipe(instantiate(ResourcesWithStatisticalOperation));
    }
}
