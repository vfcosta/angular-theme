import { Inject, Input, Component } from 'ng-forward';
import { EVENTS_HUB_KNOW_EVENT_NAMES, EventsHubService } from "../../shared/services/events-hub.service";
import { NoosferoKnownEvents } from "../../known-events";
import { BlockService } from '../../../lib/ng-noosfero-api/http/block.service';
import { NotificationService } from '../../shared/services/notification.service';
import { DesignModeService } from "../../admin/layout-edit/designMode.service";

@Component({
    selector: "noosfero-boxes",
    templateUrl: "app/layout/boxes/boxes.html"
})
@Inject("$scope", EventsHubService, BlockService, NotificationService, DesignModeService)
export class BoxesComponent {

    @Input() boxes: noosfero.Box[];
    @Input() owner: noosfero.Profile | noosfero.Environment;
    @Input() layout: string;
    @Input() columns: any[];
    @Input() startIndex: number = 0;
    mainColumn: number = -1;
    lastIndex: number;
    eventsNames: NoosferoKnownEvents;
    blocksChanged: noosfero.Block[];
    designModeOn = false;

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

    constructor(private $scope: ng.IScope,
        private eventsHubService: EventsHubService,
        private blockService: BlockService,
        private notificationService: NotificationService,
        private designModeService: DesignModeService) {
        this.eventsNames = new NoosferoKnownEvents();
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
        this.blocksChanged = [];
        this.eventsHubService.subscribeToEvent(this.eventsNames.BLOCK_CHANGED, (block: noosfero.Block) => {
            this.blocksChanged = this.blocksChanged.filter((b: noosfero.Block) => {
                return block.id !== b.id;
            });
            if (block.title != null || Object.keys(block).length > 1) {
                this.blocksChanged.push(block);
            }
            this.$scope.$apply();
        });
        this.designModeService.onToggle.subscribe((designModeOn: boolean) => {
            this.designModeOn = designModeOn;
            this.$scope.$apply();
        });
        this.designModeOn = this.designModeService.isInDesignMode();
    }

    displayApplyBlockChanges() {
        return this.blocksChanged.length > 0;
    }

    applyBlockChanges() {
        this.blockService.updateAll(this.blocksChanged).then(() => {
            this.notificationService.success({ title: "boxes.edition.success.title", message: "boxes.edition.success.message" });
            this.blocksChanged = [];
        });
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
        return `col-md-${column['size']}`;
    }
}
