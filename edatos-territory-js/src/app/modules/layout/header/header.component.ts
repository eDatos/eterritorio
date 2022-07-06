import { DOCUMENT } from "@angular/common";
import { Component, ElementRef, Inject, OnInit, Renderer2, ViewContainerRef } from "@angular/core";

import { TranslateService } from "@ngx-translate/core";

import { HtmlService } from "@app/core/service";
import { reinsertScripts } from "@app/modules/layout";
import { TerritoryAutocompleteComponent } from "@app/shared/components/territory-autocomplete";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
    static readonly TITLE_NAVBAR_ID = "title-bar";
    headerHtml = "";

    constructor(
        private elementRef: ElementRef,
        private htmlService: HtmlService,
        private translateService: TranslateService,
        private renderer: Renderer2,
        private viewContainerRef: ViewContainerRef,
        @Inject(DOCUMENT) private document: Document
    ) {}

    ngOnInit() {
        const appName = this.translateService.instant("app.name");
        this.htmlService.getHeaderHtml(appName).subscribe((data) => {
            this.headerHtml = data.toString();
            setTimeout(() => {
                reinsertScripts(this.elementRef);
                this.initializeNavbarComponents();
            });
        });
    }

    /**
     * Allows to append a component to the navbar.
     */
    private initializeNavbarComponents() {
        const componentRef = this.viewContainerRef.createComponent(TerritoryAutocompleteComponent);
        this.renderer.appendChild(
            this.document.getElementById(HeaderComponent.TITLE_NAVBAR_ID),
            componentRef.location.nativeElement
        );
    }
}
