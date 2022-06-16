import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { OperationsDto } from "@app/core/model";
import { PropertiesService, instantiate } from "@app/core/service";

@Injectable({
    providedIn: "root",
})
export class OperationService {
    public static REST_URL: string;

    constructor(private http: HttpClient, private propertiesService: PropertiesService) {
        OperationService.REST_URL = this.propertiesService.getStatisticalOperationsExternalApiUrl() + "/v1.0";
    }

    getAllOperations(): Observable<OperationsDto> {
        const headers = { "Content-Type": "application/json" };
        const url = `${OperationService.REST_URL}/operations`;
        return this.http.get(url, { headers }).pipe(instantiate(OperationsDto));
    }
}
