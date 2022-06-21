import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NotFoundComponent } from "@app/modules/error/not-found";
import { SearchTerritoryComponent } from "@app/modules/search/search-territory";

const ROUTES: Routes = [
    {
        path: "",
        component: SearchTerritoryComponent,
    },
    {
        path: "**",
        pathMatch: "full",
        component: NotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
