import {Inject, Input, Component} from "ng-forward";
import {Profile} from "./../../../models/interfaces";

@Component({
    selector: "noosfero-profile-image",
    templateUrl: 'app/components/noosfero/profile-image/profile-image.html',
})
export class ProfileImage {

    @Input() profile: Profile;
    defaultIcon: string;

    ngOnInit() {
        this.defaultIcon = 'fa-users';
        if (this.profile && this.profile.type === 'Person') {
            this.defaultIcon = 'fa-user';
        }
    }
}

