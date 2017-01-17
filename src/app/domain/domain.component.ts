import { StateConfig, Component, Inject, provide } from 'ng-forward';
import { DomainService } from "../../lib/ng-noosfero-api/http/domain.service";

@Component({
    selector: 'domain',
    templateUrl: "app/domain/domain.html",
    providers: [
        provide('domainService', { useClass: DomainService }),
    ]
})
@Inject(DomainService, "$state", "$stateParams", "contextResult")
export class DomainComponent {

    owner: noosfero.Environment | noosfero.Profile;
    domain: noosfero.Domain;

    constructor(private domainService: DomainService, private $state: ng.ui.IStateService, $stateParams: ng.ui.IStateParamsService, contextResult: noosfero.RestResult<noosfero.Domain>) {
        console.log("domain component");
        this.domain = contextResult.data;
        this.owner = contextResult.data.owner;
        if (this.isProfile()) {
            console.log("Go to profile");
            $state.go('main.profile.home', { currentProfile: this.owner }, { inherit: false });
        } else {
            console.log("Go to environment");
            $state.go('main.environment.home', { environment: this.owner });
        }
    }

    isEnvironment() {
        return this.owner && this.owner.type === "Environment";
    }

    isProfile() {
        return this.owner && !this.isEnvironment();
    }

}
