import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { PaginatorModule } from "primeng/paginator";

import { SearchTerritoryComponent } from "@app/modules/search/search-territory";
import { SharedModule } from "@app/shared";

@NgModule({
    declarations: [SearchTerritoryComponent],
    imports: [CommonModule, SharedModule, PaginatorModule],
})
export class SearchModule {}
