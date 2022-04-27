import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-dataset-card",
    templateUrl: "./dataset-card.component.html",
    styleUrls: ["./dataset-card.component.scss"],
})
export class DatasetCardComponent implements OnInit {
    @Input()
    public title: string = "";

    @Input()
    public url: string = "";

    ngOnInit(): void {}
}
