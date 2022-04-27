import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";



import { AutoCompleteModule } from "primeng/autocomplete";



import { SearchTerritoryComponent, TerritoryAutocompleteComponent } from "@app/modules/search/search-territory";
import { SharedModule } from "@app/shared";


@NgModule({
    declarations: [SearchTerritoryComponent, TerritoryAutocompleteComponent],
    imports: [CommonModule, SharedModule, FormsModule, AutoCompleteModule, ReactiveFormsModule],
})
export class SearchModule {}
