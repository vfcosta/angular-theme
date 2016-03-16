import {Component, Input} from "ng-forward";

@Component({
    selector: "noosfero-activity",
    templateUrl: 'app/components/noosfero-activities/activity/activity.html'
})
export class NoosferoActivity {

    @Input() activity: noosfero.Activity;

    getActivityTemplate() {
        return 'app/components/noosfero-activities/activity/' + this.activity.verb + '.html';
    }

}
