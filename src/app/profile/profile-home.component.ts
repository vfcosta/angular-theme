import { Router, ActivatedRoute } from '@angular/router';
import { Component, Inject } from '@angular/core';
import { ProfileService } from "../../lib/ng-noosfero-api/http/profile.service";

@Component({
    selector: 'profile-home',
    template: "<div></div>",
})
export class ProfileHomeComponent {

    profile: noosfero.Profile;

    constructor(profileService: ProfileService, router: Router, private route: ActivatedRoute) {
        this.profile = route.snapshot.data['profile'];
        profileService.getHomePage(<number>this.profile.id, { fields: 'path' }).then((response: restangular.IResponse) => {
            if (response.data && response.data.path) {
                this.profile.homepage = response.data.path;
                router.navigate(['/', this.profile.identifier, response.data.path]);
            } else {
                this.profile.homepage = null;
                router.navigate(['/', this.profile.identifier]);
            }
        });
    }
}
