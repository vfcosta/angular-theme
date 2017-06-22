import { DOCUMENT } from '@angular/platform-browser';
import { Directive, Inject, Injectable } from "@angular/core";
import { EnvironmentService } from "../../../lib/ng-noosfero-api/http/environment.service";

@Injectable()
export class HeaderService {
    private started: boolean = false;
    private titleElement: ng.IAugmentedJQuery = null;
    environment: noosfero.Environment;

    constructor(@Inject(DOCUMENT) private document: any,
        private environmentService: EnvironmentService) {

        environmentService.getCurrentEnvironment().then((environment: noosfero.Environment) => {
            this.environment = environment;
            this.setEnvironmentTitle();
        });
    }

    setEnvironmentTitle() {
        this.getTitleElement().text(this.environment.name);
    }

    private getTitleElement(): ng.IAugmentedJQuery {
        if (this.titleElement === null) {
            this.titleElement = angular.element(angular.element(this.document).find("title"));
        }
        return this.titleElement;
    }

}
