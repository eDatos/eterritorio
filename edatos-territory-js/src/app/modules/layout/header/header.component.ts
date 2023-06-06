import { DOCUMENT } from "@angular/common";
import { Component, ElementRef, Inject, OnInit, Renderer2, ViewContainerRef } from "@angular/core";

import { TranslateService } from "@ngx-translate/core";

import { HtmlService, PropertiesService } from "@app/core/service";
import { reinsertScripts } from "@app/modules/layout";
import { TerritoryAutocompleteComponent } from "@app/shared/components/territory-autocomplete";
import {CookieService} from "ngx-cookie-service";
import {AVAILABLE_LANGS} from "@app/app.constants";

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
        private propertiesService: PropertiesService,
        private cookieService: CookieService,
        private languageService: TranslateService,
        @Inject(DOCUMENT) private document: Document
    ) {}

    ngOnInit() {
        const appName = this.translateService.instant("app.name");
        this.htmlService.getHeaderHtml(appName).subscribe((data) => {
            this.headerHtml = data.toString();
            setTimeout(() => {
                reinsertScripts(this.elementRef);
                this.initializeNavbarComponents();
                this.updateLang();
            });
        });
    }

    private initializeNavbarComponents() {
        const componentRef = this.viewContainerRef.createComponent(TerritoryAutocompleteComponent);
        this.renderer.appendChild(
            this.document.getElementById(HeaderComponent.TITLE_NAVBAR_ID),
            componentRef.location.nativeElement
        );
    }

    private updateLang() {
        const cookieName = this.propertiesService.getLanguageCookieName();
        const cookieValue = this.cookieService.get(cookieName);
        if (cookieValue && AVAILABLE_LANGS.includes(cookieValue)) {
            this.languageService.use(cookieValue).subscribe(() => {
                console.debug("Language changed to", cookieValue);
            });
        }
    }
}
