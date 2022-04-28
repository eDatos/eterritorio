import { Component } from "@angular/core";

import { DatasetsDto } from "@app/core/model";
import { DatasetService } from "@app/core/service";

interface PageChangeEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

@Component({
    selector: "app-search-territory",
    templateUrl: "./search-territory.component.html",
    styleUrls: ["./search-territory.component.scss"],
})
export class SearchTerritoryComponent {
    rows = 10;
    rowsPerPage = [2, 4, 10, 20, 30, 50];
    datasetDto?: DatasetsDto;
    territoryName = "";

    constructor(private datasetService: DatasetService) {}

    search(territoryName: string, offset = 0, limit = this.rows) {
        this.datasetService.getDatasetsByQuery({ territoryName: territoryName, offset, limit }).subscribe((dto) => {
            this.datasetDto = dto;
        });
    }

    paginate(event: PageChangeEvent) {
        const { first, rows } = event;
        this.search(this.territoryName, first, rows);
    }
}
