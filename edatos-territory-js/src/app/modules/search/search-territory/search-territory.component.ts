import { Component } from "@angular/core";

import { DatasetsDto } from "@app/core/model";
import { DatasetService } from "@app/core/service";

@Component({
    selector: "app-search-territory",
    templateUrl: "./search-territory.component.html",
    styleUrls: ["./search-territory.component.scss"],
})
export class SearchTerritoryComponent {
    public userSearch: string = "";
    public datasetDto?: DatasetsDto;

    constructor(private datasetService: DatasetService) {}

    search() {
        this.datasetService.getDatasetsByTerritory(this.userSearch).subscribe((dto) => {
            this.datasetDto = dto;
        });
    }
}
