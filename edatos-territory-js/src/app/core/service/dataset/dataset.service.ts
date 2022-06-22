import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { DatasetWithDescription, DatasetsDto } from "@app/core/model";
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
            this.propertiesService.getStatisticalResourcesExternalApiUrl() + "/apis/statistical-resources/v1.0";
    }

    getAllDatasets(): Observable<DatasetsDto> {
        const url = `${DatasetService.REST_URL}/datasets`;
        return this.http.get(url).pipe(instantiate(DatasetsDto));
    }

    getDataset(
        agency: string,
        resourceId: string,
        version: string,
        fields = ["-data", "-metadata"]
    ): Observable<DatasetWithDescription> {
        const url = `${DatasetService.REST_URL}/datasets/${agency}/${resourceId}/${version}?fields=${fields.join(",")}`;
        return this.http.get(url).pipe(instantiate(DatasetWithDescription));
    }

    getAllDatasetsByTerritory(search: string): Observable<DatasetsDto> {
        const url = `${DatasetService.REST_URL}/datasets.json?query=GEOGRAPHIC_COVERAGE_TITLE ilike '${search}' and is_last_version eq 'true'`;
        return this.http.get(url).pipe(instantiate(DatasetsDto));
    }

    getDatasetsByQuery(query: DatasetQuery): Observable<DatasetsDto> {
        const { territoryName: name, limit, offset } = query;
        const url = `${DatasetService.REST_URL}/datasets.json?query=GEOGRAPHIC_COVERAGE_TITLE ilike '${name}' and is_last_version eq 'true'&limit=${limit}&offset=${offset}`;
        return this.http.get(url).pipe(instantiate(DatasetsDto));
    }

    getDatasetsByStatisticalOperationUrn(statisticalOperationUrn: string): Observable<DatasetsDto> {
        const url = `${DatasetService.REST_URL}/datasets.json?query=STATISTICAL_OPERATION_URN eq '${statisticalOperationUrn}' and is_last_version eq 'true'`;
        return this.http.get(url).pipe(instantiate(DatasetsDto));
    }

    getDatasetsByTerritoryVariableElementId(variableElementId: string): Observable<DatasetsDto> {
        const url = `${DatasetService.REST_URL}/datasets.json?query=GEOCOV_VARELEM_ID eq '${variableElementId}' and is_last_version eq 'true'`;
        return this.http.get(url /**/).pipe(instantiate(DatasetsDto));
    }

    getDatasetByUrl(url: string, fields = ["-data", "-metadata"]): Observable<DatasetWithDescription> {
        url += `?fields=${fields.join(",")}`;
        return this.http.get(url).pipe(instantiate(DatasetWithDescription));
    }
}
