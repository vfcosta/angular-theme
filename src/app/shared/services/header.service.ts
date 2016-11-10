import { Directive, Inject, Injectable } from "ng-forward";
import { INgForwardJQuery } from 'ng-forward/cjs/util/jqlite-extensions';
import { EnvironmentService } from "../../../../src/lib/ng-noosfero-api/http/environment.service";

@Injectable()
@Inject("$rootScope", "$document", EnvironmentService)
export class HeaderService {

    private started: boolean = false;
    private titleElement: ng.IAugmentedJQuery = null;

    constructor(
        private $rootScope: ng.IRootScopeService,
        private $document: ng.IDocumentService,
        private environmentService: EnvironmentService
    ) {
    }

    setEnvironmentTitle() {
        let title = this.environmentService.getCurrentEnvironment().name;
        this.getTitleElement().text(title);
    }

    private getTitleElement(): ng.IAugmentedJQuery {
        if (this.titleElement === null) {
            this.titleElement = angular.element(this.$document.find("title"));
        }
        return this.titleElement;
    }

}
