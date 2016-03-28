import {Component, Inject, provide} from 'ng-forward';
import {EnvironmentService} from "../../lib/ng-noosfero-api/http/environment.service";
import {NotificationService} from "../shared/services/notification.service";

/**
 * @ngdoc controller
 * @name environment.Environment
 * @description
 *  This is the environment controller.
 */
@Component({
    selector: 'environment-home',
    templateUrl: "app/environment/environment-home.html",
    providers: [
        provide('environmentService', { useClass: EnvironmentService }),
        provide('notificationService', { useClass: NotificationService })
    ]
})
@Inject(EnvironmentService, "$log", "$sce")
export class EnvironmentHomeComponent {

    environment: noosfero.Environment;

    constructor(private environmentService: EnvironmentService, private $sce: ng.ISCEService) {
        environmentService.getByIdentifier("default").then((result: noosfero.Environment) => {
            this.environment = result;
        });
    }

    getEnvironmentDescription() {
        if (this.environment && this.environment.settings && this.environment.settings.description) {
            return this.$sce.trustAsHtml(this.environment.settings.description);
        }
        else {
            return "";
        }
    }
}