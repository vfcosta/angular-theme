import { StateConfig, Component, Inject, provide } from 'ng-forward';
import { DomainService } from "../../lib/ng-noosfero-api/http/domain.service";

@Component({
    selector: 'domain',
    templateUrl: "app/domain/domain.html",
    providers: [
        provide('domainService', { useClass: DomainService }),
    ]
})
@Inject(DomainService, "$state")
export class DomainComponent {

    owner: noosfero.Environment | noosfero.Profile;
    domain: noosfero.Domain;

    constructor(private domainService: DomainService, private $state: ng.ui.IStateService) {
        this.domainService.get("context").then((result: noosfero.RestResult<noosfero.Domain>) => {
            this.domain = result.data;
            this.owner = result.data.owner;
            if (this.isProfile()) {
                $state.go('main.profile.home', { currentProfile: this.owner });
            } else {
                $state.go('main.environment.home', { environment: this.owner });
            }
        });
    }

    isEnvironment() {
        return this.owner && this.owner.type === "Environment";
    }

    isProfile() {
        return this.owner && !this.isEnvironment();
    }

}
