import {Component, Inject, provide} from "ng-forward";
import {ProfileService} from "../../../lib/ng-noosfero-api/http/profile.service";

@Component({
    selector: "content-viewer-actions",
    templateUrl: "app/article/content-viewer/navbar-actions.html",
    providers: [provide('profileService', { useClass: ProfileService })]
})
@Inject(ProfileService)
export class ContentViewerActionsComponent {

    article: noosfero.Article;
    profile: noosfero.Profile;

    constructor(profileService: ProfileService) {
        profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
            this.profile = profile;
        });
    }
}
