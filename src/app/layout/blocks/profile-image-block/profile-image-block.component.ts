import {Inject, Input, Component} from "ng-forward";
import {ProfileImageComponent} from "./../../../profile/image/image.component";

@Component({
    selector: "noosfero-profile-image-block",
    templateUrl: 'app/layout/blocks/profile-image-block/profile-image-block.html',
    directives: [ProfileImageComponent]
})
export class ProfileImageBlockComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile;

}
