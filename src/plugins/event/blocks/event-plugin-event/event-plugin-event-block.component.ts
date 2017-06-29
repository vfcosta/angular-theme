import {Component, Inject, Input} from "@angular/core";
import {BlockService} from "./../../../../lib/ng-noosfero-api/http/block.service";
import {Arrays} from "./../../../../lib/util/arrays";

@Component({
    selector: "noosfero-event-plugin-event-block",
    template: require('plugins/event/blocks/event-plugin-event/event-plugin-event-block.html')
})
export class EventPluginEventBlockComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile;

    events: any;
    options: any;
    monthEvents: any;

    constructor(private blockService: BlockService,
        @Inject("$state") private $state: any) { }

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
