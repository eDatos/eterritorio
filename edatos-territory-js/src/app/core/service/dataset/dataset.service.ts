import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { DatasetsDto } from "@app/core/model";
import { instantiate } from "@app/core/service";

@Injectable({
    providedIn: "root",
})
export class DatasetService {
    public static REST_URL = "statistical-resources/v1.0";

    constructor(public http: HttpClient) {}

    getAllDatasets(): Observable<DatasetsDto> {
        const headers = { "Content-Type": "application/json" };
        const url = `${DatasetService.REST_URL}/datasets`;
        return this.http.get(url, { headers }).pipe(instantiate(DatasetsDto));
    }

    getDatasetsByTerritory(search: string): Observable<DatasetsDto> {
        const headers = { "Content-Type": "application/json" };
        const url = `${DatasetService.REST_URL}/datasets?query=GEOGRAPHIC_COVERAGE_TITLE ilike '${search}' and is_last_version eq 'true'`;
        return this.http.get(url, { headers }).pipe(instantiate(DatasetsDto));
    }
}
