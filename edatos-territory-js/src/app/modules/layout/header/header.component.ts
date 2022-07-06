import { Component, ElementRef, OnInit } from "@angular/core";

import { TranslateService } from "@ngx-translate/core";

import { HtmlService } from "@app/core/service";
import { reinsertScripts } from "@app/modules/layout";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
    headerHtml = "";

    constructor(
        private elementRef: ElementRef,
        private htmlService: HtmlService,
        private translateService: TranslateService
    ) {}

    ngOnInit() {
        const appName = this.translateService.instant("app.name");
        this.htmlService.getHeaderHtml(appName).subscribe((data) => {
            this.headerHtml = data.toString();
            setTimeout(() => {
                reinsertScripts(this.elementRef);
            });
        });
    }
}
