import { Inject, Input, Output, Component, provide } from "ng-forward";

@Component({
    selector: "noosfero-profile-header",
    templateUrl: 'app/profile/header/profile-header.html'
})
export class ProfileHeaderComponent {

    @Input() profile: noosfero.Profile;

    profileBackground() {
        if (!this.profile || !this.profile.top_image) return null;
        return `background-image: url("${this.profile.top_image.url}")`;
    }

}
