import {Component, Input, Inject} from "ng-forward";

@Component({
    selector: "noosfero-activity-header",
    templateUrl: 'app/profile/activities/activity/activity_header.html'
})
export class ActivityHeaderComponent {

	@Input() activity: noosfero.Activity;
	@Input() desc: any;
	@Input() profiles: any;
	@Input() iconalt: any;
	@Input() iconclass: any;

}