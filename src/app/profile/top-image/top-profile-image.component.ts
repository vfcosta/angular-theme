import { Inject, Input, Component } from "@angular/core";
import { ProfileService } from "../../../lib/ng-noosfero-api/http/profile.service";
import { PermissionService } from "../../shared/services/permission.service";

@Component({
    selector: "noosfero-top-profile-image",
    template: require('app/profile/top-image/top-profile-image.html')
})
export class TopProfileImageComponent {

    @Input() profile: noosfero.Profile;
    @Input() editable: boolean;
    picFile: any;

    constructor( @Inject('profileService') private profileService: ProfileService,
        @Inject('permissionService') private permissionService: PermissionService) { }

    upload(data: any) {
        this.profileService.uploadImage(this.profile, data, 'top').then((result: noosfero.RestResult<noosfero.Profile>) => {
            this.profile.top_image = result.data.top_image;
        });
    }

    hasTopImage() {
        return this.profile && this.profile.top_image;
    }

    isEditable() {
        return this.editable && this.permissionService.isAllowed(this.profile, 'allow_edit');
    }
}
