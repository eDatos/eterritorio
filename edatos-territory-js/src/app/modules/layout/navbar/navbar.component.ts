import { Component, ElementRef, OnInit } from "@angular/core";

import { HtmlService } from "@app/core/service";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
    public navbarHtml = "";

    constructor(private elementRef: ElementRef, private htmlService: HtmlService) {}

    ngOnInit() {
        this.htmlService.getHeaderHtml().subscribe((data) => {
            this.navbarHtml = data.toString();
            setTimeout(() => {
                reinsertScripts(this.elementRef);
            });
        });
    }
}

export function reinsertScripts(el: ElementRef) {
    const scriptList = el.nativeElement.getElementsByTagName("script");
    for (const script of scriptList) {
        const scriptCopy = document.createElement("script");
        if (script.innerHTML) {
            scriptCopy.innerHTML = script.innerHTML;
        } else if (script.src) {
            scriptCopy.src = script.src;
        }
        scriptCopy.async = false;
        script.parentNode.replaceChild(scriptCopy, script);
    }
}
