import { Component, OnInit } from "@angular/core";

import { TreeNode } from "primeng/api";

import { TranslateService } from "@ngx-translate/core";
import { finalize } from "rxjs";

import { Dataset } from "@app/core/model";
import { DatasetService, OperationService, PropertiesService } from "@app/core/service";

@Component({
    selector: "app-operations-list",
    templateUrl: "./operations-list.component.html",
    styleUrls: ["./operations-list.component.scss"],
})
export class OperationsListComponent implements OnInit {
    tree: TreeNode[] = [];
    loading = false;

    constructor(
        private operationService: OperationService,
        private translateService: TranslateService,
        private datasetService: DatasetService,
        private propertiesService: PropertiesService
    ) {}

    ngOnInit(): void {
        this.loading = true;
        this.operationService
            .getAllOperations()
            .pipe(finalize(() => (this.loading = false)))
            .subscribe((operations) => {
                this.tree = this.toTreeNodeList(operations.operation);
            });
    }

    loadOperationDatasets(event: any) {
        if (event.node) {
            event.node.loading = true;
            this.datasetService
                .getDatasetsByStatisticalOperationUrn(event.node.key)
                .pipe(finalize(() => (event.node.loading = false)))
                .subscribe((datasets) => {
                    if (datasets.total > 0) {
                        event.node.children = this.toTreeNodeList(datasets.dataset);
                    } else {
                        event.node.children = [];
                    }
                });
        }
    }

    getVisualizerUrl(datasetId: string): string {
        return this.propertiesService.generateVisualizerUrl(datasetId);
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
        }
        return children;
    }
}
