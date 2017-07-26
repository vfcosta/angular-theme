import { ActivatedRoute, Router } from '@angular/router';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { ProfileService } from './../../../lib/ng-noosfero-api/http/profile.service';
import { SessionService } from './../../login';

/**
 * @ngdoc controller
 * @name NoosferoActivities
 * @description
 *  The controller responsible to profile configuration.
 */
@Component({
    selector: "noosfero-profile-configuration",
    templateUrl: './profile-configuration.html',
    styleUrls: ['./profile-configuration.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProfileConfigurationComponent {
    profile: noosfero.Profile;
    profileIdentifier: string;
    showComponent = "";

    constructor(private profileService: ProfileService, route: ActivatedRoute, router: Router) {
        this.profileIdentifier = route.snapshot.params["profile"];
        this.profile = route.snapshot.data["profile"];
    }
}
