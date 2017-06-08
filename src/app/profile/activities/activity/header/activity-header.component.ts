import {Component, Input, Inject} from "@angular/core";

@Component({
    selector: "noosfero-activity-header",
    template: require('app/profile/activities/activity/header/activity_header.html')
})
export class ActivityHeaderComponent {

    @Input() activity: noosfero.Activity;
    @Input() desc: any;
    @Input() profiles: any;
    @Input() iconalt: any;
    @Input() iconclass: any;

}