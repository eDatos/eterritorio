import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { EMPTY, expand, Observable, reduce } from "rxjs";

import { ResourcesWithStatisticalOperation, ResourcesWithStatisticalOperationNoHateoas } from "@app/core/model";
import { instantiate, PropertiesService } from "@app/core/service";

@Injectable({
    providedIn: "root",
})
export class DatasetService {
    public static REST_URL: string;
    private static LIMIT = 1000;

    constructor(
        private http: HttpClient,
        private propertiesService: PropertiesService
    ) {
        DatasetService.REST_URL = this.propertiesService.getStatisticalResourcesExternalApiUrl() + "/v1.0";
    }

    /**
     * Returns all possible datasets that contains info about a territory.
     *
     * Note that this implies that multiple requests are made in order to
     * overcome API pagination, so HATEOAS attributes are not present in
     * the response object of this method.
     */
    getAllDatasetsByTerritoryVariableElementId(
        variableElementId: string,
        offset = 0
    ): Observable<ResourcesWithStatisticalOperationNoHateoas> {
        return this.getDatasetsByTerritoryVariableElementId(variableElementId, offset).pipe(
            expand((response) => {
                if (response.offset + response.limit <= response.total) {
                    return this.getDatasetsByTerritoryVariableElementId(
                        variableElementId,
                        response.offset + DatasetService.LIMIT
                    );
                } else {
                    return EMPTY;
                }
            }),
            reduce((acc, response) => {
                if (acc) {
                    acc.resource = [...acc.resource, ...response.resource];
                    return acc;
                }
                return response;
            })
        );
    }

    getDatasetsByTerritoryVariableElementId(
        variableElementId: string,
        offset = 0
    ): Observable<ResourcesWithStatisticalOperation> {
        const url = `${DatasetService.REST_URL}/resources.json?query=GEOCOV_VARELEM_ID eq '${variableElementId}' AND IS_LAST_VERSION EQ 'true'&limit=${DatasetService.LIMIT}&offset=${offset}`;
        return this.http.get(url).pipe(instantiate(ResourcesWithStatisticalOperation));
    }
}
