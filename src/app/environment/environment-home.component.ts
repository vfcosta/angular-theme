import { DomSanitizer } from '@angular/platform-browser';
import {Component, Inject} from '@angular/core';
import {EnvironmentService} from "../../lib/ng-noosfero-api/http/environment.service";

/**
 * @ngdoc controller
 * @name environment.Environment
 * @description
 *  This is the environment controller.
 */
@Component({
    selector: 'environment-home',
    template: require("app/environment/environment-home.html"),
})
export class EnvironmentHomeComponent {

    environment: noosfero.Environment;

    constructor(private environmentService: EnvironmentService, private sanitizer: DomSanitizer) {
        environmentService.getCurrentEnvironment().then((environment: noosfero.Environment) => {
            this.environment = environment;
        });
    }

    getEnvironmentDescription() {
        if (this.environment && this.environment.settings && this.environment.settings.description) {
            return this.sanitizer.bypassSecurityTrustHtml(this.environment.settings.description);
        }
        else {
            return "";
        }
    }
}
