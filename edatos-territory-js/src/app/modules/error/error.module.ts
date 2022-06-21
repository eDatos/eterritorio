import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { TranslateModule } from "@ngx-translate/core";

import { NotFoundComponent } from "@app/modules/error/not-found";

@NgModule({
    declarations: [NotFoundComponent],
    imports: [CommonModule, TranslateModule],
})
export class ErrorModule {}
