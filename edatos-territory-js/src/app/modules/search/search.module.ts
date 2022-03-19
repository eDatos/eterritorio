import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SearchTerritoryComponent } from "@app/modules/search/search-territory";
import { SharedModule } from "@app/shared";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [SearchTerritoryComponent],
    imports: [CommonModule, SharedModule, InputTextModule, FormsModule],
})
export class SearchModule {}
