import { BlockService } from './../../../../lib/ng-noosfero-api/http/block.service';
import { Component, Inject, Input, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    selector: "noosfero-recent-activities-plugin-activities-block",
    templateUrl: './recent-activities-plugin-activities-block.html',
    styleUrls: ['./recent-activities-plugin-activities-block.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class RecentActivitiesPluginActivitiesBlockComponent implements OnInit {

    @Input() block: any;
    @Input() owner: any;
    @Input() designMode: boolean;

    profile: any;
    activities: any;

    constructor(private blockService: BlockService) { }

    getActivityTemplate(activity: any) {
        if (activity.label === 'events') {
            // return 'app/layout/blocks/recent-activities-plugin-activities/activities/event.html';
        } else {
            // return 'app/layout/blocks/recent-activities-plugin-activities/activities/' + activity.verb + '.html';
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
