import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NavbarComponent } from "@app/modules/layout/navbar";
import { SharedModule } from "@app/shared";

@NgModule({
    declarations: [NavbarComponent],
    imports: [CommonModule, SharedModule],
    exports: [NavbarComponent],
})
export class LayoutModule {}
