import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AutoCompleteModule } from "primeng/autocomplete";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { TreeModule } from "primeng/tree";

import { TranslateModule } from "@ngx-translate/core";

import { DatasetCardComponent } from "@app/shared/components/dataset-card";
import { OperationsListComponent } from "@app/shared/components/operations-list";
import { SafeHtmlPipe } from "@app/shared/pipe";

import { StripHtmlPipe } from "./pipe/strip-html.pipe";

@NgModule({
    declarations: [SafeHtmlPipe, DatasetCardComponent, StripHtmlPipe, OperationsListComponent],
    exports: [SafeHtmlPipe, DatasetCardComponent, OperationsListComponent],
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
