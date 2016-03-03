import {Input, Component} from "ng-forward";

@Component({
    selector: "noosfero-profile-image-block",
    templateUrl: 'app/components/noosfero-blocks/profile-image/profile-image.html',
})
export class ProfileImageBlock {

    @Input() block: any;
    @Input() owner: any;

}
