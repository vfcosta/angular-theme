import {Component, Inject, provide} from 'ng-forward';
import {EnvironmentService} from "../../lib/ng-noosfero-api/http/environment.service";

/**
 * @ngdoc controller
 * @name environment.Environment
 * @description
 *  This is the environment controller.
 */
@Component({
    selector: 'environment-home',
    templateUrl: "app/environment/environment-home.html",
})
@Inject("environmentService", "$sce")
export class EnvironmentHomeComponent {

    environment: noosfero.Environment;

    constructor(private environmentService: EnvironmentService, private $sce: ng.ISCEService) {
        environmentService.getCurrentEnvironment().then((environment: noosfero.Environment) => {
            this.environment = environment;
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
