import { Injectable } from "@angular/core";

import { PropertiesService } from "@app/core/service";

@Injectable({
    providedIn: "root",
})
export class VisualizerService {
    constructor(private propertiesService: PropertiesService) {}

    generateVisualizerUrl(
        resourceId: string,
        version = "~latest",
        resourceType = "dataset",
        visualization = "table"
    ): string {
        const visualizerWebUrl = this.propertiesService.getVisualizerWebUrl();
        const agencyId = this.propertiesService.getAgencyId();
        return `${visualizerWebUrl}/data.html?agencyId=${agencyId}&resourceId=${resourceId}&version=${version}&resourceType=${resourceType}#visualization/${visualization}`;
    }
}
