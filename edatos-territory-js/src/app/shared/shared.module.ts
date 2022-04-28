import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AutoCompleteModule } from "primeng/autocomplete";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";

import { DatasetCardComponent } from "@app/shared/components/dataset-card";
import { TerritoryAutocompleteComponent } from "@app/shared/components/territory-autocomplete";
import { SafeHtmlPipe } from "@app/shared/pipe";

@NgModule({
    declarations: [SafeHtmlPipe, DatasetCardComponent, TerritoryAutocompleteComponent],
    exports: [SafeHtmlPipe, DatasetCardComponent, TerritoryAutocompleteComponent],
    imports: [CommonModule, CardModule, ButtonModule, AutoCompleteModule, ReactiveFormsModule, FormsModule],
})
export class SharedModule {}
