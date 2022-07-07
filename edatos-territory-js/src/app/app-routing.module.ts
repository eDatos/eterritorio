import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NotFoundComponent } from "@app/modules/error/not-found";
import { TerritoriesListComponent, TerritoryInfoComponent } from "@app/modules/territory";

const ROUTES: Routes = [
    {
        path: "",
        component: TerritoriesListComponent,
    },
    {
        path: "territory/:territoryId",
        component: TerritoryInfoComponent,
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
