import { DomainService } from '../../lib/ng-noosfero-api/http/domain.service';
import { EnvironmentService } from '../../lib/ng-noosfero-api/http/environment.service';
import { AuthService } from '../login';
import { Component, Inject, provide } from 'ng-forward';

@Component({
    selector: 'domain',
    templateUrl: "app/domain/domain.html",
    providers: [
        provide('domainService', { useClass: DomainService }),
    ]
})
@Inject(DomainService, "$state", "$stateParams", "contextResult", AuthService, EnvironmentService)
export class DomainComponent {

    owner: noosfero.Environment | noosfero.Profile;
    domain: noosfero.Domain;

    constructor(private domainService: DomainService, private $state: ng.ui.IStateService, $stateParams: ng.ui.IStateParamsService, contextResult: noosfero.RestResult<noosfero.Domain>,
        private environmentService: EnvironmentService) {
        this.domain = contextResult.data;
        this.owner = contextResult.data.owner;

        if (this.isProfile()) {
            $state.go('main.profile.home', { currentProfile: this.owner }, { inherit: false });
        } else {
            environmentService.setCurrentEnvironment(<noosfero.Environment>this.owner);
            $state.go('main.environment.home');

        }
    }

    isEnvironment() {
        return this.owner && this.owner.type === "Environment";
    }

    isProfile() {
        return this.owner && !this.isEnvironment();
    }

}
