import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { PaginatorModule } from "primeng/paginator";

import { TranslateModule } from "@ngx-translate/core";

import { SearchTerritoryComponent } from "@app/modules/search/search-territory";
import { TerritoriesListComponent } from "@app/modules/search/territories-list";
import { TerritoryComponent } from "@app/modules/search/territory";
import { SharedModule } from "@app/shared";

@NgModule({
    declarations: [SearchTerritoryComponent, TerritoriesListComponent, TerritoryComponent],
    imports: [CommonModule, SharedModule, PaginatorModule, TranslateModule],
})
export class SearchModule {}
