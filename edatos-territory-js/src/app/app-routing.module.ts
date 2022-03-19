import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SearchTerritoryComponent } from "@app/modules/search/search-territory";

const ROUTES: Routes = [
    {
        path: "",
        component: SearchTerritoryComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
