import {Component, Inject, Input} from "ng-forward";
import {BlockService} from "./../../../../lib/ng-noosfero-api/http/block.service";
import {Arrays} from "./../../../../lib/util/arrays";

@Component({
    selector: "noosfero-event-plugin-event-block",
    templateUrl: 'app/layout/blocks/event-plugin-event/event-plugin-event-block.html'
})
@Inject(BlockService, "$state", "$scope")
export class EventPluginEventBlockComponent {

    @Input() block: any;
    @Input() owner: any;

    profile: any;
    events: any;
    options: any;
    monthEvents: any;

    constructor(private blockService: BlockService, private $state: any, private $scope: any) { }

    urlFor(params: any) {
        let url = '//' + params.host;
        if (params.port) {
              url += ':' + params.port;
        }
        url += '/' + params.profile + '/';
        if (params.page) {
            url += params.page.join('/');
        }
        return url;
    }

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
        this.$scope.$apply();
    }

    ngOnInit() {
        this.profile = this.owner;
        this.events = [];
        this.monthEvents = [];
        const that = this;

        this.options = {
            changeMonth(month: any, year: number) {
                that.populateMonthEvents(month.index, year);
            }
        };

        this.blockService.getApiContent(this.block).then((content: any) => {
            this.events = content.events;
            const curr: any = new Date();
            this.populateMonthEvents(curr.getMonth(), curr.getFullYear());
        });
    }
}
