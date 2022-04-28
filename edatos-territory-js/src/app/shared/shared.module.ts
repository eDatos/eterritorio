import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { AutoCompleteModule } from "primeng/autocomplete";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { VirtualScrollerModule } from "primeng/virtualscroller";

import { DatasetCardComponent } from "@app/shared/components/dataset-card";
import { TerritoryAutocompleteComponent } from "@app/shared/components/territory-autocomplete";
import { SafeHtmlPipe } from "@app/shared/pipe";


@NgModule({
    declarations: [SafeHtmlPipe, DatasetCardComponent, TerritoryAutocompleteComponent],
    exports: [SafeHtmlPipe, DatasetCardComponent, TerritoryAutocompleteComponent],
    imports: [CommonModule, CardModule, ButtonModule, AutoCompleteModule, ReactiveFormsModule],
})
export class SharedModule {}
