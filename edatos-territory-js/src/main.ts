// needed for class-transformer
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import "reflect-metadata";

import { AppModule } from "@app/app.module";

import { environment } from "./environments/environment";

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => {
        console.error(err);
        showErrorMessage(err);
    });

function showErrorMessage(err: any) {
    const loaderDiv = document.getElementById("loader");
    if (loaderDiv) {
        loaderDiv.style.display = "none";
    }

    const errorDiv = document.getElementById("error");
    if (errorDiv) {
        errorDiv.style.display = "block";
        const stacktraceDiv = document.getElementById("stacktrace");
        if (stacktraceDiv) {
            stacktraceDiv.textContent = err.message;
        }
    }
}
