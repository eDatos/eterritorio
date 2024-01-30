import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { OperationsWithSubjectArea } from "@app/core/model";
import { PropertiesService, instantiate } from "@app/core/service";

@Injectable({
  providedIn: 'root'
})
export class OperationService {
    public static REST_URL: string;
    private static LIMIT: string = "100000";

    constructor(private http: HttpClient, private propertiesService: PropertiesService) {
        OperationService.REST_URL =
            this.propertiesService.getStatisticalOperationsExternalApiUrl() + "/v1.0";
    }

    getListOfOperations(): Observable<OperationsWithSubjectArea> {
        const url = `${OperationService.REST_URL}/operations?limit=${OperationService.LIMIT}&fields=+subjectArea`;
        return this.http.get(url).pipe(instantiate(OperationsWithSubjectArea));
    }
}
