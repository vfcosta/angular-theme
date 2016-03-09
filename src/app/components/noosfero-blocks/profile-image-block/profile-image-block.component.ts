import {Inject, Input, Component} from "ng-forward";
import {ProfileImage} from "./../../../components/noosfero/profile-image/profile-image.component";

@Component({
    selector: "noosfero-profile-image-block",
    templateUrl: 'app/components/noosfero-blocks/profile-image-block/profile-image-block.html',
    directives: [ProfileImage]
})
export class ProfileImageBlock {

    @Input() block: any;
    @Input() owner: any;
    
}
