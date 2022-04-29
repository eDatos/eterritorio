import { Component, ElementRef, OnInit } from "@angular/core";

import { HtmlService } from "@app/core/service";
import { reinsertScripts } from "@app/modules/layout";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
    headerHtml = "";

    constructor(private elementRef: ElementRef, private htmlService: HtmlService) {}

    ngOnInit() {
        this.htmlService.getHeaderHtml().subscribe((data) => {
            this.headerHtml = data.toString();
            setTimeout(() => {
                reinsertScripts(this.elementRef);
            });
        });
    }
}
