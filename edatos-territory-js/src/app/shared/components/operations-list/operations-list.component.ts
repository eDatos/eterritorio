import { Component, Input, OnInit } from "@angular/core";

import { TreeNode } from "primeng/api";

import { TranslateService } from "@ngx-translate/core";
import { finalize } from "rxjs";

import { Resource, ItemBase, StatisticalOperation} from "@app/core/model";
import { OperationService } from "@app/core/service";

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
    datasets?: Resource[];
    tree: TreeNode[] = [];
    loading = false;

    constructor(
        private translateService: TranslateService
    ) {}

    private getAllOperationsFromDatasets() {
        const operations: StatisticalOperation[] = [];
        if (this.datasets) {
          this.datasets.forEach(dataset => {
            if (!operations.find((op) => op.urn === dataset.statisticalOperation.urn)) {
                operations.push(new StatisticalOperation(dataset.statisticalOperation.id, dataset.statisticalOperation.urn, dataset.statisticalOperation.name));
            }
          });
        }
        return operations;
    }

    ngOnInit(): void {
        this.tree = this.toTreeNodeList(this.getAllOperationsFromDatasets());
    }

    getVisualizerUrl(datasetId: string): string {
        const dataset = this.datasets?.find((dataset) => dataset.resourceID?.id === datasetId);
        return dataset ? dataset.visualizerHtmlLink : '';
    }

    private toTreeNodeList(siemacResource: { urn: string; getName: Function }[]): TreeNode[] {
        const children = [];
        for (const elem of siemacResource) {
            const isDataset = elem instanceof ItemBase;
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
                    this.getDatasetsByStatisticalOperation(elem.urn)
                );
            }
        }
        return children;
    }

    private getDatasetsByStatisticalOperation(statisticalOperation: string): ItemBase[]  {
        const filteredDatasets: Resource[] = this.datasets?.filter((dataset) => dataset.statisticalOperation?.urn === statisticalOperation) || [];
        return filteredDatasets?.map(item =>{return item.resourceID}) || [];
    }
}
