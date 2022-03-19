import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";



import { DatasetCardComponent } from "@app/shared/components/dataset-card";
import { SafeHtmlPipe } from "@app/shared/pipe";


@NgModule({
    declarations: [SafeHtmlPipe, DatasetCardComponent],
    exports: [SafeHtmlPipe, DatasetCardComponent],
    imports: [CommonModule],
})
export class SharedModule {}
