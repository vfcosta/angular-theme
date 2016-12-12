import { Inject, Input, Component } from 'ng-forward';

@Component({
    selector: "noosfero-boxes",
    templateUrl: "app/layout/boxes/boxes.html"
})
@Inject("$scope")
export class BoxesComponent {

    @Input() boxes: noosfero.Box[];
    @Input() owner: noosfero.Profile | noosfero.Environment;
    @Input() layout: string;
    @Input() columns: any[];
    @Input() startIndex: number = 0;
    mainColumn: number = -1;
    lastIndex: number;

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

    constructor(private $scope: ng.IScope) {
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
