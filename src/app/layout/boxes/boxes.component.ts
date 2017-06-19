import { Inject, Input, Component } from 'ng-forward';
import { DesignModeService } from "../../shared/services/design-mode.service";
import { EventsHubService } from "../../shared/services/events-hub.service";

@Component({
    selector: "noosfero-boxes",
    templateUrl: "app/layout/boxes/boxes.html"
})
@Inject("$scope", DesignModeService, EventsHubService)
export class BoxesComponent {

    @Input() boxes: noosfero.Box[];
    @Input() owner: noosfero.Profile | noosfero.Environment;
    @Input() layout: string;
    @Input() columns: any[];
    @Input() startIndex: number = 0;
    mainColumn: number = -1;
    lastIndex: number;
    designMode = false;

    /**
     * Mapping between noosfero layouts and bootstrap grid system
     */
    static layouts = {
        "topleft": [{ size: 12 }, { size: 3 }, { size: 9, main: true }],
        "leftbar": [{ size: 3 }, { size: 9, main: true }],
        "default": [{ size: 3 }, { size: 6, main: true }, { size: 3 }],
        "lefttopright": [{ size: 3 }, { size: 9, subcolumns: [{ size: 12 }, { size: 9, main: true }, { size: 3 }] }],
        "2leftbars": [{ size: 3 }, { size: 3 }, { size: 6, main: true }],
        "rightbar": [{ size: 9, main: true }, { size: 3 }],
        "leftbottom": [{ size: 3 }, { size: 9, main: true }, { size: 12 }],
        "nosidebars": [{ size: 12, main: true }]
    };

    constructor(private $scope: ng.IScope, private designModeService: DesignModeService, private eventsHubService: EventsHubService) {
        this.designModeService.onToggle.subscribe((designModeOn: boolean) => {
            this.designMode = designModeOn;
        });
    }

    showButton(column: any) {
        return this.designMode && this.isNotParent(column);
    }

    isNotParent(column: any) {
        return column['subcolumns'] === undefined;
    }

    ngOnInit() {
        if (!this.layout) {
            this.setupColumns();
        } else {
            this.$scope.$watch("ctrl.layout", () => {
                this.columns = null;
                this.setupColumns();
            });
        }
        this.designMode = this.designModeService.isInDesignMode();
    }

    setupColumns() {
        if (!this.columns) this.columns = (<any>BoxesComponent.layouts)[this.layout];
        this.mainColumn = this.columns.findIndex((el: any) => {
            return el.main;
        });
    }

    getBox(index: number) {
        this.lastIndex = index;
        if (index === this.mainColumn) {
            return this.boxes[0];
        } else if (index < this.mainColumn || this.mainColumn === -1) {
            return this.boxes[index + this.startIndex + 1];
        }
        return this.boxes[index + this.startIndex];
    }

    getBoxClass(column: any) {
        let boxClass = `col-md-${column['size']}`;
        if (!this.isNotParent(column)) boxClass += ` box-column-parent`;
        return boxClass;
    }

    addBlock(box: noosfero.Box, block: noosfero.Block) {
        block.permissions = ["allow_edit"];
        box.blocks.forEach((block: noosfero.Block) => {
            if (!block._destroy) block.position++;
        });
        block.position = 1;
        box.blocks.unshift(block);
    }

    updatePosition(sortedBlocks: noosfero.Block[]) {
        let i = 0;
        sortedBlocks.forEach((block: noosfero.Block) => {
            block.position = ++i;
        });
    }
}
