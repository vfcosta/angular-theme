import {Component, Inject, Input} from "@angular/core";
import {BlockService} from "../../../../lib/ng-noosfero-api/http/block.service";
import {Arrays} from "./../../../../lib/util/arrays";

@Component({
    selector: "noosfero-recent-activities-plugin-activities-block",
    template: require('plugins/recent_activities/blocks/recent-activities-block/recent-activities-plugin-activities-block.html')
})
export class RecentActivitiesPluginActivitiesBlockComponent {

    @Input() block: any;
    @Input() owner: any;

    profile: any;
    activities: any;

    constructor(@Inject("blockService") private blockService: BlockService) { }

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
