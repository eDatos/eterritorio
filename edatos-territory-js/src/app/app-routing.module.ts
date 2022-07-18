import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NotFoundComponent } from "@app/modules/error/not-found";
import { TerritoryDetailComponent, TerritoryListComponent } from "@app/modules/territory";

const ROUTES: Routes = [
    {
        path: "",
        component: TerritoryListComponent,
    },
    {
        path: "territory/:territoryId",
        component: TerritoryDetailComponent,
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
