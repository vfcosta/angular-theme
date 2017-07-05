import { ProfileService } from './../../../lib/ng-noosfero-api/http/profile.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class ProfileResolver implements Resolve<noosfero.Profile> {

    constructor(private profileService: ProfileService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let profileWithBoxes: noosfero.Profile;
        return this.profileService.setCurrentProfileByIdentifier(route.params["profile"]).then((profile: noosfero.Profile) => {
            profileWithBoxes = profile;
            return this.profileService.getBoxes(<number>profile.id);
        }).then((response: any) => {
            profileWithBoxes.boxes = response.data;
            this.profileService.setCurrentProfile(profileWithBoxes);
            return profileWithBoxes;
        });
    }
}
