import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";



import { DatasetsDto } from "@app/core/model";
import { DatasetService } from "@app/core/service";


interface PageChangeEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

interface Query {
    territoryName: string;
    offset?: number;
    limit?: number;
}

@Component({
    selector: "app-search-territory",
    templateUrl: "./search-territory.component.html",
    styleUrls: ["./search-territory.component.scss"],
})
export class SearchTerritoryComponent implements OnInit {
    readonly ROWS_PER_PAGE = [5, 10, 20, 30, 50];

    territoryName = "";
    limit = 10;
    offset = 0;

    datasetDto?: DatasetsDto;

    constructor(
        private datasetService: DatasetService,
        private router: Router,
        private title: Title,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const queryParams = this.route.snapshot.queryParams as Query;
        if (queryParams.territoryName) {
            this.search(queryParams);
        }
    }

    search({ territoryName, offset = 0, limit = this.limit }: Query) {
        const queryParams = { territoryName, offset, limit };
        this.navigate(queryParams);
        this.datasetService.getDatasetsByQuery(queryParams).subscribe((dto) => {
            this.datasetDto = dto;
        });
    }

    paginate(event: PageChangeEvent) {
        const { first, rows } = event;
        this.search({ territoryName: this.territoryName, offset: first, limit: rows });
    }

    navigate(queryParams: Query) {
        this.title.setTitle("Datasets: " + queryParams.territoryName);
        this.updateFromQueryParams(queryParams);
        this.router.navigate([], { relativeTo: this.route, queryParams });
    }

    private updateFromQueryParams(queryParams: Query) {
        const { territoryName, limit, offset } = queryParams;
        this.territoryName = territoryName;
        this.limit = Number(limit || this.limit);
        this.offset = Number(offset || this.offset);
    }
}
