import { ProfileService } from './../../../lib/ng-noosfero-api/http/profile.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class ProfileResolver implements Resolve<noosfero.Profile> {

    constructor(private profileService: ProfileService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.profileService.setCurrentProfileByIdentifier(route.params["profile"], { optional_fields: ['boxes'] }).then((profile: noosfero.Profile) => {
            return profile;
        });
    }
}
