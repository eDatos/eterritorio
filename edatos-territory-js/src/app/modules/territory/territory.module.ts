import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { PaginatorModule } from "primeng/paginator";
import { ProgressSpinnerModule } from "primeng/progressspinner";

import { TranslateModule } from "@ngx-translate/core";

import { TerritoriesListComponent, TerritoryInfoComponent } from "@app/modules/territory";
import { SharedModule } from "@app/shared";

@NgModule({
    declarations: [TerritoriesListComponent, TerritoryInfoComponent],
    imports: [CommonModule, SharedModule, PaginatorModule, TranslateModule, ProgressSpinnerModule],
    exports: [],
})
export class TerritoryModule {}
