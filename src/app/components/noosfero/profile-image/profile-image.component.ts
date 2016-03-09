import {Inject, Input, Component} from "ng-forward";
import {Profile} from "./../../../models/interfaces";

@Component({
    selector: "noosfero-profile-image",
    templateUrl: 'app/components/noosfero/profile-image/profile-image.html',
})
export class ProfileImage {

    @Input() profile: Profile;
    defaultIcon: any;
    
    ngOnInit() {
        this.defaultIcon = 'fa-users';
        console.debug("On ProfileImage ngOnInit. Profile: " + this.profile)
        if (this.profile && this.profile.type === 'Person') {
            this.defaultIcon = 'fa-user';
        }
    }
}

