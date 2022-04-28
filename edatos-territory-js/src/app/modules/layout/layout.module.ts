import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FooterComponent, HeaderComponent } from "@app/modules/layout";
import { SharedModule } from "@app/shared";

@NgModule({
    declarations: [HeaderComponent, FooterComponent],
    imports: [CommonModule, SharedModule],
    exports: [HeaderComponent, FooterComponent],
})
export class LayoutModule {}
