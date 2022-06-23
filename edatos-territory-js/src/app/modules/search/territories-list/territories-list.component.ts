import { Component, OnInit } from "@angular/core";

import { ConfigService, PropertiesService } from "@app/core/service";

@Component({
    selector: "app-territories-list",
    templateUrl: "./territories-list.component.html",
    styleUrls: ["./territories-list.component.scss"],
})
export class TerritoriesListComponent implements OnInit {
    ccaaTerritories: string[] = [];
    provTerritories: string[] = [];
    islandTerritories: string[] = [];
    munTerritories: string[] = [];
    nutsCode?: string;

    constructor(private configService: ConfigService, private propertiesService: PropertiesService) {}

    ngOnInit(): void {
        this.configService.getTerritories().subscribe((territories) => {
            this.init(territories);
        });

        this.nutsCode = this.propertiesService.getTerritoryNutsCode();
    }

    private init(territories: any) {
        const zoneToShow = territories.zones.find((zone: any) => zone.id === territories.zoneIdToShow);
        for (const code of zoneToShow.codes) {
            if (code.startsWith("CCAA")) {
                this.ccaaTerritories.push(code);
            } else if (code.startsWith("PROV")) {
                this.provTerritories.push(code);
            } else if (code.startsWith("ISLA")) {
                this.islandTerritories.push(code);
            } else if (code.startsWith("MUN")) {
                this.munTerritories.push(code);
            } else {
                throw new Error("could not detect the type of the territory: " + code);
            }
        }
    }
}
