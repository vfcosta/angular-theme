import { BlockService } from './../../../../lib/ng-noosfero-api/http/block.service';
import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: "noosfero-event-plugin-event-block",
    templateUrl: './event-plugin-event-block.html',
    styleUrls: ['./event-plugin-event-block.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class EventPluginEventBlockComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile;
    @Input() designMode: boolean;

    events: any;
    options: any;
    monthEvents: any;

    constructor(private blockService: BlockService) { }

    populateMonthEvents(month: number, year: number) {
        let events: any = [];
        this.events.forEach((e: any) => {
            let date: any = new Date(e.date);
            if (month === date.getMonth() && year === date.getFullYear()) {
                e.label = (("0" + date.getDate()).slice(-2)) + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + ' ' + date.getHours() + ':' + date.getMinutes() + ' ' + e.title;
                events.push(e);
            }
        });
        this.monthEvents = events.slice();
    }

    ngOnInit() {
        this.events = [];
        this.monthEvents = [];

        this.options = {
            changeMonth(month: any, year: number) {
                this.populateMonthEvents(month.index, year);
            }
        };

        this.blockService.getApiContent(this.block).then((content: any) => {
            this.events = content.events;
            const curr: any = new Date();
            this.populateMonthEvents(curr.getMonth(), curr.getFullYear());
        });
    }
}
