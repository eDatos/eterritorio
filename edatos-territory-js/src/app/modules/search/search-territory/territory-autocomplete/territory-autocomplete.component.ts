import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
    selector: "app-territory-autocomplete",
    templateUrl: "./territory-autocomplete.component.html",
    styleUrls: ["./territory-autocomplete.component.scss"],
})
export class TerritoryAutocompleteComponent {
    name = new FormControl("");
    suggestions: string[] = [];

    @Output()
    searchEvent = new EventEmitter<string>();

    private territories = ["Canarias", "Tenerife", "Madrid", "Albacete", "Sevilla"];

    complete(event: { originalEvent: InputEvent; query: string }) {
        this.suggestions = this.territories.filter((territory) => new RegExp(event.query, "gi").test(territory));
    }

    search() {
        this.searchEvent.emit(this.name.value);
    }
}
