import { Component, Input, OnInit } from "@angular/core";

import { TranslateService } from "@ngx-translate/core";

import { Dataset } from "@app/core/model";

@Component({
    selector: "app-dataset-card",
    templateUrl: "./dataset-card.component.html",
    styleUrls: ["./dataset-card.component.scss"],
})
export class DatasetCardComponent implements OnInit {
    @Input()
    public dataset!: Dataset;
    public lang = this.translateService.currentLang;

    constructor(private translateService: TranslateService) {}

    ngOnInit(): void {
        this.translateService.onLangChange.subscribe((langChangeEvent) => {
            this.lang = langChangeEvent.lang;
        });
    }

    getVisualizerUrl(datasetId: string): string {
        return `https://estadisticas.arte-consultores.com/istac/visualizer/data.html?agencyId=ISTAC&resourceId=${datasetId}&version=~latest&resourceType=dataset#visualization/table`;
    }
}
