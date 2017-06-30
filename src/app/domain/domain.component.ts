import { ActivatedRoute, Router } from '@angular/router';
import { DomainService } from '../../lib/ng-noosfero-api/http/domain.service';
import { EnvironmentService } from '../../lib/ng-noosfero-api/http/environment.service';
import { AuthService } from '../login';
import { Component, Inject } from '@angular/core';

@Component({
    selector: 'domain',
    template: "<div></div>",
})
export class DomainComponent {

    owner: noosfero.Environment | noosfero.Profile;
    domain: noosfero.Domain;

    constructor(private domainService: DomainService, private environmentService: EnvironmentService,
        private router: Router, private route: ActivatedRoute) {

        this.domain = route.snapshot.data['domain'];
        this.owner = this.domain.owner;

        if (this.isProfile()) {
            this.router.navigate([(<noosfero.Profile>this.owner).identifier]);
            // $state.go('main.profile.home', { currentProfile: this.owner }, { inherit: false });
        } else {
            environmentService.setCurrentEnvironment(<noosfero.Environment>this.owner);
            // $state.go('main.environment.home');
        }
    }

    isEnvironment() {
        return this.owner && this.owner.type === "Environment";
    }

    isProfile() {
        return this.owner && !this.isEnvironment();
    }

}
