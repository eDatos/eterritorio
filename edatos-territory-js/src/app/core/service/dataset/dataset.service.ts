import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { DatasetsDto, DatasetWithDescription } from "@app/core/model";
import { PropertiesService, instantiate } from "@app/core/service";

interface DatasetQuery {
    territoryName: string;
    limit: number;
    offset: number;
}

@Injectable({
    providedIn: "root",
})
export class DatasetService {
    public static REST_URL: string;

    constructor(private http: HttpClient, private configService: PropertiesService) {
        DatasetService.REST_URL = this.configService.getStatisticalResourcesExternalApiUrl() + "/v1.0";
    }

    getAllDatasets(): Observable<DatasetsDto> {
        const headers = { "Content-Type": "application/json" };
        const url = `${DatasetService.REST_URL}/datasets`;
        return this.http.get(url, { headers }).pipe(instantiate(DatasetsDto));
    }

    getAllDatasetsByTerritory(search: string): Observable<DatasetsDto> {
        const headers = { "Content-Type": "application/json" };
        const url = `${DatasetService.REST_URL}/datasets?query=GEOGRAPHIC_COVERAGE_TITLE ilike '${search}' and is_last_version eq 'true'`;
        return this.http.get(url, { headers }).pipe(instantiate(DatasetsDto));
    }

    getDatasetsByQuery(query: DatasetQuery): Observable<DatasetsDto> {
        const { territoryName: name, limit, offset } = query;
        const headers = { "Content-Type": "application/json" };
        const url = `${DatasetService.REST_URL}/datasets?query=GEOGRAPHIC_COVERAGE_TITLE ilike '${name}' and is_last_version eq 'true'&limit=${limit}&offset=${offset}`;
        return this.http.get(url, { headers }).pipe(instantiate(DatasetsDto));
    }

    getDatasetByUrl(url: string): Observable<DatasetWithDescription> {
        const headers = { "Content-Type": "application/json" };
        url += `?fields=-data,-metadata`;
        return this.http.get(url, { headers }).pipe(instantiate(DatasetWithDescription));
    }
}
