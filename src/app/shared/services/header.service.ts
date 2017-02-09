import { Directive, Inject, Injectable } from "ng-forward";
import { INgForwardJQuery } from 'ng-forward/cjs/util/jqlite-extensions';
import { EnvironmentService } from "../../../lib/ng-noosfero-api/http/environment.service";

@Injectable()
@Inject("$rootScope", "$document", "environmentService")
export class HeaderService {
    private started: boolean = false;
    private titleElement: ng.IAugmentedJQuery = null;
    environment: noosfero.Environment;


    constructor(
        private $rootScope: ng.IRootScopeService,
        private $document: ng.IDocumentService,
        private environmentService: EnvironmentService
    ) {
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
            this.titleElement = angular.element(this.$document.find("title"));
        }
        return this.titleElement;
    }

}
