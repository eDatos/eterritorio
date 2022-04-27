import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";



import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";



import { DatasetCardComponent } from "@app/shared/components/dataset-card";
import { SafeHtmlPipe } from "@app/shared/pipe";


@NgModule({
    declarations: [SafeHtmlPipe, DatasetCardComponent],
    exports: [SafeHtmlPipe, DatasetCardComponent],
    imports: [CommonModule, CardModule, ButtonModule],
})
export class SharedModule {}
