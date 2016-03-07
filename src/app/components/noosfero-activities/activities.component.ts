import {Component, Input} from "ng-forward";
import {NoosferoActivity} from "./activity/activity.component";
import {Activity} from "../../models/interfaces";

@Component({
    selector: "noosfero-activities",
    templateUrl: 'app/components/noosfero-activities/activities.html',
    directives: [NoosferoActivity]
})
export class NoosferoActivities {

    @Input() activities: Activity[];

}
