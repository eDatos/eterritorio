import { HttpClientTestingModule } from "@angular/common/http/testing";
import { APP_INITIALIZER, ApplicationInitStatus } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { Observable, of } from "rxjs";

import { Properties } from "@app/core/config";
import { MetadataService } from "@app/core/service";
import { ConfigService } from "@app/core/service/config/config.service";

import { AppComponent } from "./app.component";
import { LayoutModule } from "./modules/layout";
import { LoadingBarModule } from "@ngx-loading-bar/core";

describe("AppComponent", () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule, LayoutModule, LoadingBarModule],
            declarations: [AppComponent],
        }).compileComponents();
    });

    it("should create the app", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
