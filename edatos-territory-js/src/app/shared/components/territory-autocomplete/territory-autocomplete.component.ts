import { Component, EventEmitter, Input, Output } from "@angular/core";

import { TranslateService } from "@ngx-translate/core";

import { PropertiesService } from "@app/core/service";

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

    private nutsCode: string;
    private territories: string[] = [];

    constructor(private propertiesService: PropertiesService, private translateService: TranslateService) {
        this.nutsCode = propertiesService.getTerritoryNutsCode();
        propertiesService.requestTerritoryCodes().subscribe((territories) => {
            this.territories = territories.map(territory => this.translateService.instant(`territories.${this.nutsCode}.${territory}`));
        });
    }

    complete(event: { originalEvent: InputEvent; query: string }) {
        let searchTerm = this.removeDiacritics(event.query);
        this.suggestions = this.territories.filter((territory) => {
            territory = this.removeDiacritics(territory);
            return new RegExp(searchTerm, "gi").test(territory);
        });
    }

    search() {
        this.searchEvent.emit(this.name);
    }

    onNameChange(_event: any) {
        this.nameChange.emit(this.name);
    }

    private removeDiacritics(str: string): string {
        return str.normalize("NFD").replace(/\p{Diacritic}/gu, "");
    }
}
