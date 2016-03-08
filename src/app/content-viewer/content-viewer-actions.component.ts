import {Component, Inject, provide} from "ng-forward";
import {ProfileService} from "../../lib/ng-noosfero-api/http/profile.service";

import {Profile} from "./../models/interfaces";

@Component({
    selector: "content-viewer-actions",
    templateUrl: "app/content-viewer/navbar-actions.html",
    providers: [provide('profileService', { useClass: ProfileService })]
})
@Inject(ProfileService)
export class ContentViewerActions {

    article: any;
    profile: any;

    constructor(profileService: ProfileService) {
        profileService.getCurrentProfile().then((profile: Profile) => {
            this.profile = profile;
        });
    }
}
