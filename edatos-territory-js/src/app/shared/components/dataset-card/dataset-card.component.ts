import { Component, Input, OnInit } from "@angular/core";

import { TranslateService } from "@ngx-translate/core";

import { Dataset } from "@app/core/model";
import { DatasetService, PropertiesService } from "@app/core/service";

@Component({
    selector: "app-dataset-card",
    templateUrl: "./dataset-card.component.html",
    styleUrls: ["./dataset-card.component.scss"],
})
export class DatasetCardComponent implements OnInit {
    @Input()
    dataset!: Dataset;

    lang = this.translateService.currentLang;
    title?: string | null;
    visualizerUrl?: string;
    description: string | null = "";

    constructor(
        private translateService: TranslateService,
        private propertiesService: PropertiesService,
        private datasetService: DatasetService
    ) {}

    ngOnInit(): void {
        this.translateService.onLangChange.subscribe((langChangeEvent) => {
            this.lang = langChangeEvent.lang;
        });
        this.init();
    }

    init() {
        this.title = this.dataset.getName(this.lang);
        this.visualizerUrl = this.getVisualizerUrl();

        this.datasetService.getDatasetByUrl(this.dataset.selfLink.href).subscribe((dataset) => {
            this.description = dataset.description.get(this.lang);
        });
    }

    getVisualizerUrl(): string {
        return this.propertiesService.generateVisualizerUrl(this.dataset?.id);
    }
}
