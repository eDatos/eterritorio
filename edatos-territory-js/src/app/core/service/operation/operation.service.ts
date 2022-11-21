import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { PropertiesService, instantiate } from "@app/core/service";

@Injectable({
    providedIn: "root",
})
export class OperationService {
    public static REST_URL: string;

    constructor(private http: HttpClient, private propertiesService: PropertiesService) {
        OperationService.REST_URL = this.propertiesService.getStatisticalOperationsExternalApiUrl() + "/v1.0";
    }

}
