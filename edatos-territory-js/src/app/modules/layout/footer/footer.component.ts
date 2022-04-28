import { Component, ElementRef, OnInit } from "@angular/core";

import { HtmlService } from "@app/core/service";
import { reinsertScripts } from "@app/modules/layout";

@Component({
    selector: "app-footer",
    templateUrl: "./footer.component.html",
})
export class FooterComponent implements OnInit {
    footerHtml = "";

    constructor(private elementRef: ElementRef, private htmlService: HtmlService) {}

    ngOnInit(): void {
        this.htmlService.getFooterHtml().subscribe((data) => {
            this.footerHtml = data.toString();
            setTimeout(() => {
                reinsertScripts(this.elementRef);
            });
        });
    }
}
