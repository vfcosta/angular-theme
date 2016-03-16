import {Component, Input} from "ng-forward";
import {NoosferoActivity} from "./activity/activity.component";

@Component({
    selector: "noosfero-activities",
    templateUrl: 'app/components/noosfero-activities/activities.html',
    directives: [NoosferoActivity]
})
export class NoosferoActivities {

    @Input() activities: noosfero.Activity[];

}
