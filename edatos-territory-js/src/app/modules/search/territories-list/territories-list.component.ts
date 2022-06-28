import { Component, OnInit } from "@angular/core";

import { Territories, Zone } from "@app/core/config";
import { ConfigService } from "@app/core/service";

@Component({
    selector: "app-territories-list",
    templateUrl: "./territories-list.component.html",
    styleUrls: ["./territories-list.component.scss"],
})
export class TerritoriesListComponent implements OnInit {
    zones: Zone[] = [];

    constructor(private configService: ConfigService) {}

    ngOnInit(): void {
        this.configService.getTerritories().subscribe((territories) => {
            this.init(territories);
        });
    }

    init(territories: Territories) {
        this.zones = territories.zones;
    }

    isString(elem: string | { id: string; i18n_title: string; children: string[] }): elem is string {
        return typeof elem === "string";
    }
}
