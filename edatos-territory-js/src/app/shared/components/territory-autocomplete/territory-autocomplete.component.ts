import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "app-territory-autocomplete",
    templateUrl: "./territory-autocomplete.component.html",
    styleUrls: ["./territory-autocomplete.component.scss"],
})
export class TerritoryAutocompleteComponent {
    suggestions: string[] = [];

    @Input()
    name = "";

    @Output()
    nameChange = new EventEmitter<string>();

    @Output()
    searchEvent = new EventEmitter<string>();

    private territories = ["Canarias", "Tenerife", "Madrid", "Albacete", "Sevilla"]; // TODO: Load from file.

    complete(event: { originalEvent: InputEvent; query: string }) {
        this.suggestions = this.territories.filter((territory) => new RegExp(event.query, "gi").test(territory));
    }

    search() {
        this.searchEvent.emit(this.name);
    }

    onNameChange(_event: any) {
        this.nameChange.emit(this.name);
    }
}
