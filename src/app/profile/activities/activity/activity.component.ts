import {Component, Input} from "ng-forward";

@Component({
    selector: "noosfero-activity",
    templateUrl: 'app/profile/activities/activity/activity.html'
})
export class ActivityComponent {

    @Input() activity: noosfero.Activity;

    getActivityTemplate() {
        return 'app/profile/activities/activity/' + this.activity.verb + '.html';
    }

}
