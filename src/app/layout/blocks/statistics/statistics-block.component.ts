import {Input, Inject, Component} from "ng-forward";

@Component({
    selector: "noosfero-statistics-block",
    templateUrl: 'app/layout/blocks/statistics/statistics-block.html'
})

export class StatisticsBlockComponent {
    @Input() block: noosfero.StatisticsBlock;
    @Input() owner: any;
}
