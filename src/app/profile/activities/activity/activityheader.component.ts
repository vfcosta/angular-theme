import {Component, Input, Inject} from "ng-forward";
import { EnvironmentService } from "../../../../lib/ng-noosfero-api/http/environment.service";
import { TranslatorService } from "../../../shared/services/translator.service";

@Component({
    selector: "noosfero-activity-header",
    templateUrl: 'app/profile/activities/activity/activity_header.html'
})
@Inject(EnvironmentService, TranslatorService)
export class ActivityHeaderComponent {

	@Input() activity: noosfero.Activity;
	@Input() desc: any;
	@Input() profiles: noosfero.Profile;
	@Input() iconalt: any;
	@Input() iconclass: any;

	ngOnInit() {
        console.log("onInit.Header => ", this);
    }


}