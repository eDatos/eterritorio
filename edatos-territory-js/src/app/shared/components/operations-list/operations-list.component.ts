import { Component, Input, OnInit } from "@angular/core";

import { TreeNode } from "primeng/api";

import { TranslateService } from "@ngx-translate/core";
import { finalize } from "rxjs";

import { Dataset, DatasetWithDescription } from "@app/core/model";
import { OperationService, VisualizerService } from "@app/core/service";

@Component({
    selector: "app-operations-list",
    templateUrl: "./operations-list.component.html",
    styleUrls: ["./operations-list.component.scss"],
})
export class OperationsListComponent implements OnInit {
    /**
     * Variable element ID of the territory.
     */
    @Input()
    datasets: DatasetWithDescription[] = [];

    tree: TreeNode[] = [];
    loading = false;

    constructor(
        private operationService: OperationService,
        private translateService: TranslateService,
        private visualizerService: VisualizerService
    ) {}

    ngOnInit(): void {
        this.loading = true;
        this.operationService
            .getAllOperations()
            .pipe(finalize(() => (this.loading = false)))
            .subscribe((operations) => {
                const operationsToShow = operations.operation.filter((operation) => {
                    return this.datasets.some(
                        (dataset) => dataset.metadata?.statisticalOperation.urn === operation.urn
                    );
                });
                this.tree = this.toTreeNodeList(operationsToShow);
            });
    }

    getVisualizerUrl(datasetId: string): string {
        return this.visualizerService.generateVisualizerUrl(datasetId);
    }

    private toTreeNodeList(siemacResource: { urn: string; getName: Function }[]): TreeNode[] {
        const children = [];
        for (const elem of siemacResource) {
            const isDataset = elem instanceof Dataset;
            const node: TreeNode = {
                key: elem.urn,
                label: elem.getName(this.translateService.currentLang),
                data: elem,
                leaf: isDataset,
                type: isDataset ? "dataset" : undefined,
            };
            children.push(node);
            if (!isDataset) {
                node.children = this.toTreeNodeList(
                    this.datasets.filter((dataset) => dataset.metadata?.statisticalOperation.urn === elem.urn)
                );
            }
        }
        return children;
    }
}
