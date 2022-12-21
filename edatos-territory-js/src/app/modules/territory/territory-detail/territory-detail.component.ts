import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";

import { TranslateService } from "@ngx-translate/core";
import { finalize } from "rxjs";

import { Resource } from "@app/core/model";
import { DatasetService, PropertiesService } from "@app/core/service";

@Component({
    selector: "app-territory-info",
    templateUrl: "./territory-detail.component.html",
    styleUrls: ["./territory-detail.component.scss"],
})
export class TerritoryDetailComponent implements OnInit {
    resources?: Resource[];
    loading = false;
    territoryId?: string;

    constructor(
        private route: ActivatedRoute,
        private propertiesService: PropertiesService,
        private datasetService: DatasetService,
        private translateService: TranslateService,
        private title: Title
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            const territoryId = params["territoryId"];
            const territoryName = this.translateService.instant(`nodes.${territoryId}`);
            const title = this.translateService.instant("territory.page.title", { territory: territoryName });
            this.title.setTitle(title);
            this.init(territoryId);
        });
    }

    init(territoryId: string) {
        this.loading = true;
        this.territoryId = territoryId;       

        this.datasetService.getDatasetsByTerritoryVariableElementId(this.territoryId)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe((resources) => {
            this.resources = resources.resource;
        });
    }
}
