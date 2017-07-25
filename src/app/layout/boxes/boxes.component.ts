import { Inject, Input, Component, ViewEncapsulation } from '@angular/core';
import { DesignModeService } from '../../shared/services/design-mode.service';
import { EventsHubService } from '../../shared/services/events-hub.service';

@Component({
    selector: "noosfero-boxes",
    templateUrl: './boxes.html',
    styleUrls: ['./boxes.scss'],
    encapsulation: ViewEncapsulation.None,
})
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

    constructor(private designModeService: DesignModeService, private eventsHubService: EventsHubService) {
        this.designModeService.onToggle.subscribe((designModeOn: boolean) => {
            this.designMode = designModeOn;
        });
    }

    ngOnChanges() {
        if (this.layout) this.columns = null;
        this.setupColumns();
    }

    ngOnInit() {
        if (!this.layout) {
            this.setupColumns();
        }
        this.designMode = this.designModeService.isInDesignMode();
    }

    setupColumns() {
        if (!this.columns) {
            if (!this.layout) return;
            this.columns = (<any>BoxesComponent.layouts)[this.layout];
        }
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

    isNotParent(column: any) {
        return column['subcolumns'] === undefined;
    }

    getBoxClass(column: any) {
        let boxClass = `col-md-${column['size']}`;
        if (!this.isNotParent(column)) boxClass += ` box-column-parent`;
        return boxClass;
    }

    updatePosition(sortedBlocks: noosfero.Block[]) {
        let i = 0;
        sortedBlocks.forEach((block: noosfero.Block) => {
            block.position = ++i;
        });
    }
}
