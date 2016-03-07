import {Component, Input} from "ng-forward";
import {Activity} from "../../../models/interfaces";

@Component({
    selector: "noosfero-activity",
    templateUrl: 'app/components/noosfero-activities/activity/activity.html'
})
export class NoosferoActivity {

    @Input() activity: Activity;

    getActivityTemplate() {
        return 'app/components/noosfero-activities/activity/' + this.activity.verb + '.html';
    }

}
