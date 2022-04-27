import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SearchTerritoryComponent } from "@app/modules/search/search-territory";
import { SharedModule } from "@app/shared";

@NgModule({
    declarations: [SearchTerritoryComponent],
    imports: [CommonModule, SharedModule],
})
export class SearchModule {}
