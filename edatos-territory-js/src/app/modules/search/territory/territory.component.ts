import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";

import { TranslateService } from "@ngx-translate/core";
import { finalize, forkJoin } from "rxjs";

import { Dataset } from "@app/core/model";
import { DatasetService, PropertiesService } from "@app/core/service";

@Component({
    selector: "app-territory",
    templateUrl: "./territory.component.html",
    styleUrls: ["./territory.component.scss"],
})
export class TerritoryComponent implements OnInit {
    datasets?: Dataset[];
    loading = false;
    variableElementId?: string;

    constructor(
        private route: ActivatedRoute,
        private propertiesService: PropertiesService,
        private datasetService: DatasetService,
        private translateService: TranslateService,
        private title: Title
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            const variableElementId = params["variableElementId"];
            const territoryName = this.translateService.instant(`territories.${variableElementId}`);
            const title = this.translateService.instant("territories.title", { territory: territoryName });
            this.title.setTitle(title);
            this.init(variableElementId);
        });
    }

    init(variableElementId: string) {
        this.loading = true;
        this.variableElementId = variableElementId;

        const agencyId = this.propertiesService.getOrganization();

        this.datasetService.getDatasetsByTerritoryVariableElementId(this.variableElementId).subscribe((datasets) => {
            const observables$ = [];

            for (const dataset of datasets.dataset) {
                observables$.push(
                    this.datasetService.getDataset(agencyId, dataset.id, "~latest", ["-data", "-dimension.description"])
                );
            }

            forkJoin(observables$)
                .pipe(finalize(() => (this.loading = false)))
                .subscribe((datasets: Dataset[]) => {
                    this.datasets = datasets;
                });
        });
    }
}
