import { Component, OnInit } from "@angular/core";

import { Group, Territories } from "@app/core/config";
import { ConfigService } from "@app/core/service";

@Component({
    selector: "app-territories-list",
    templateUrl: "./territories-list.component.html",
    styleUrls: ["./territories-list.component.scss"],
})
export class TerritoriesListComponent implements OnInit {
    groups: Group[] = [];

    constructor(private configService: ConfigService) {}

    ngOnInit(): void {
        this.configService.getTerritories().subscribe((territories) => {
            this.init(territories);
        });
    }

    init(territories: Territories) {
        this.groups = territories.groups;
    }
}
