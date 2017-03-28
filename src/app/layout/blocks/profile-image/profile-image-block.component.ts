import { Input, Component } from "ng-forward";
import { ProfileImageComponent } from "./../../../profile/image/profile-image.component";
import { ProfileJoinComponent } from "./../../../profile/profile-join/profile-join.component";

@Component({
    selector: "noosfero-profile-image-block",
    templateUrl: 'app/layout/blocks/profile-image/profile-image-block.html'
})
export class ProfileImageBlockComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile;

    constructor() {
    }

}
