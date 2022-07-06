import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { AutoCompleteModule } from "primeng/autocomplete";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { TreeModule } from "primeng/tree";

import { TranslateModule } from "@ngx-translate/core";

import { DatasetCardComponent } from "@app/shared/components/dataset-card";
import { OperationsListComponent } from "@app/shared/components/operations-list";
import { TerritoryAutocompleteComponent } from "@app/shared/components/territory-autocomplete";
import { SafeHtmlPipe } from "@app/shared/pipe";

import { StripHtmlPipe } from "./pipe/strip-html.pipe";

@NgModule({
    declarations: [
        SafeHtmlPipe,
        DatasetCardComponent,
        StripHtmlPipe,
        OperationsListComponent,
        TerritoryAutocompleteComponent,
    ],
    exports: [
        SafeHtmlPipe,
        DatasetCardComponent,
        OperationsListComponent,
        RouterModule,
        TerritoryAutocompleteComponent,
    ],
    imports: [
        CommonModule,
        CardModule,
        ButtonModule,
        AutoCompleteModule,
        ReactiveFormsModule,
        FormsModule,
        ProgressSpinnerModule,
        TreeModule,
        TranslateModule,
    ],
})
export class SharedModule {}
