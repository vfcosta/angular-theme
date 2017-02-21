import {Component, Inject, Input} from "ng-forward";
import {BlockService} from "../../../../lib/ng-noosfero-api/http/block.service";
import {Arrays} from "./../../../../lib/util/arrays";

@Component({
    selector: "noosfero-recent-activities-plugin-activities-block",
    templateUrl: 'app/layout/blocks/recent-activities-plugin-activities/recent-activities-plugin-activities-block.html'
})
@Inject(BlockService, "$state")
export class RecentActivitiesPluginActivitiesBlockComponent {

    @Input() block: any;
    @Input() owner: any;

    profile: any;
    activities: any;

    constructor(private blockService: BlockService, private $state: any) { }

    getActivityTemplate(activity: any) {
        if (activity.label === 'events') {
            //return 'app/layout/blocks/recent-activities-plugin-activities/activities/event.html';
        }
        else {
            //return 'app/layout/blocks/recent-activities-plugin-activities/activities/' + activity.verb + '.html';
        }
    }

    ngOnInit() {
        this.profile = this.owner;
        this.activities = [];
        this.blockService.getApiContent(this.block).then((content: any) => {
            this.activities = content.activities;
        });
    }
}
