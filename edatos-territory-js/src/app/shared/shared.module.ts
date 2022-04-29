import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AutoCompleteModule } from "primeng/autocomplete";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ProgressSpinnerModule } from "primeng/progressspinner";

import { DatasetCardComponent } from "@app/shared/components/dataset-card";
import { TerritoryAutocompleteComponent } from "@app/shared/components/territory-autocomplete";
import { SafeHtmlPipe } from "@app/shared/pipe";

import { StripHtmlPipe } from "./pipe/strip-html.pipe";

@NgModule({
    declarations: [SafeHtmlPipe, DatasetCardComponent, TerritoryAutocompleteComponent, StripHtmlPipe],
    exports: [SafeHtmlPipe, DatasetCardComponent, TerritoryAutocompleteComponent],
    imports: [
        CommonModule,
        CardModule,
        ButtonModule,
        AutoCompleteModule,
        ReactiveFormsModule,
        FormsModule,
        ProgressSpinnerModule,
    ],
})
export class SharedModule {}
