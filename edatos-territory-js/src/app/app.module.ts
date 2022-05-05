import { HttpClient, HttpClientModule } from "@angular/common/http";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { LoadingBarModule } from "@ngx-loading-bar/core";
import { LoadingBarHttpClientModule } from "@ngx-loading-bar/http-client";
import { LoadingBarRouterModule } from "@ngx-loading-bar/router";
import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { AppRoutingModule } from "@app/app-routing.module";
import { AppComponent } from "@app/app.component";
import { AVAILABLE_LANGS, DEFAULT_LANG } from "@app/app.constants";
import { PropertiesService } from "@app/core/service";
import { LayoutModule } from "@app/modules/layout";
import { SearchModule } from "@app/modules/search";

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

export function configureTranslationService(translateService: TranslateService): Function {
    translateService.addLangs(AVAILABLE_LANGS);
    return () => translateService.use(DEFAULT_LANG);
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        LayoutModule,
        SearchModule,
        LoadingBarHttpClientModule,
        LoadingBarRouterModule,
        LoadingBarModule,
        TranslateModule.forRoot({
            defaultLanguage: DEFAULT_LANG,
            useDefaultLang: true,
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
        }),
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: configureTranslationService,
            deps: [TranslateService],
            multi: true,
        },
        {
            provide: APP_INITIALIZER,
            useFactory: (ms: PropertiesService) => () => ms.init(),
            deps: [PropertiesService],
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
