import { ProfileService } from './../../../lib/ng-noosfero-api/http/profile.service';
import { ThemeService } from './../../shared/services/theme.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class ProfileResolver implements Resolve<noosfero.Profile> {

    constructor(private profileService: ProfileService, private themeService: ThemeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let profileWithBoxes: noosfero.Profile;
        return this.profileService.setCurrentProfileByIdentifier(route.params["profile"]).then((profile: noosfero.Profile) => {
            if (this.themeService.verifyTheme(profile.theme)) return <Promise<any>>new Promise(() => {}); // return an empty promise to break promise chain
            profileWithBoxes = profile;
            return this.profileService.getBoxes(<number>profile.id);
        }).then((response: any) => {
            profileWithBoxes.boxes = response.data;
            this.profileService.setCurrentProfile(profileWithBoxes);
            return profileWithBoxes;
        });
    }
}
