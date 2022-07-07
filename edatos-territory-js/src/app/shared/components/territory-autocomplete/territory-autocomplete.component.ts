import { Component, OnInit } from "@angular/core";
import { Router, RoutesRecognized } from "@angular/router";

import { TranslateService } from "@ngx-translate/core";
import { filter, map, startWith } from "rxjs";

import { PropertiesService } from "@app/core/service";
import { removeDiacritics } from "@app/core/service/util";

type TerritoryInfo = { id: string; name: string };

@Component({
    selector: "app-territory-autocomplete",
    templateUrl: "./territory-autocomplete.component.html",
    styleUrls: ["./territory-autocomplete.component.scss"],
})
export class TerritoryAutocompleteComponent implements OnInit {
    territoryId?: TerritoryInfo;

    territories: TerritoryInfo[] = [];
    suggestions: TerritoryInfo[] = [];

    constructor(
        private propertiesService: PropertiesService,
        private translateService: TranslateService,
        private router: Router
    ) {}

    ngOnInit(): void {
        // Since this component is outside <router-outlet> we cannot use
        // ActivatedRoute, because it wouldn't return any data
        // See https://stackoverflow.com/a/45737376/7611990
        this.router.events
            .pipe(
                filter((event): event is RoutesRecognized => {
                    return event instanceof RoutesRecognized;
                }),
                map((elem) => elem.url),
                startWith(this.router.url) // see https://stackoverflow.com/a/71725525/7611990
            )
            .subscribe((url) => {
                const urlSegments = url.split("/");
                if (urlSegments[1] === "territory" && urlSegments[2]) {
                    this.territoryId = {
                        id: urlSegments[2],
                        name: this.translateService.instant("nodes." + urlSegments[2]),
                    };
                }
            });

        this.territories = this.propertiesService
            .getTerritoriesList()
            .map((id) => ({ id, name: this.translateService.instant("nodes." + id) }));
    }

    complete(event: { originalEvent: InputEvent; query: string }) {
        const searchTerm = removeDiacritics(event.query);
        this.suggestions = this.territories.filter((territory) => {
            return new RegExp(searchTerm, "gi").test(removeDiacritics(territory.name));
        });
    }

    goTo(territory: TerritoryInfo) {
        this.router.navigate(["territory", territory.id]);
    }
}
