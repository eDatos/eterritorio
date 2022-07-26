import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { PrimeNGConfig } from "primeng/api";

import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
    constructor(
        private primengConfig: PrimeNGConfig,
        private title: Title,
        private translateService: TranslateService
    ) {}

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.translateService.get("app.page.title").subscribe((translation) => {
            this.title.setTitle(translation);
        });
    }
}
