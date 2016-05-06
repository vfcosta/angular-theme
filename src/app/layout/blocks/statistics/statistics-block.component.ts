import {Component, Input} from "ng-forward";

@Component({
    selector: "noosfero-statistics-block",
    templateUrl: 'app/layout/blocks/statistics/statistics-block.html'
})

export class StatisticsBlockComponent {

    @Input() block: any;
    @Input() owner: any;

    html: string;

    ngOnInit() {
        this.html = this.block.settings.user_counter;
    }
}
