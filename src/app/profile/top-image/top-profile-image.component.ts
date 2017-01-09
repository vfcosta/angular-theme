import { Inject, Input, Output, Component, provide } from "ng-forward";
import { ProfileService } from "../../../lib/ng-noosfero-api/http/profile.service";
import { PermissionService } from "../../shared/services/permission.service";

/**
 * @ngdoc controller
 * @name components.noosfero.top-profile-image.ProfileImage
 * @description The component responsible for rendering the profile top image
 * @exports TopProfileImageComponent
 */
@Component({
    selector: "noosfero-top-profile-image",
    templateUrl: 'app/profile/top-image/top-profile-image.html',
    providers: [
        provide('profileService', { useClass: ProfileService })
    ]
})
@Inject(ProfileService, PermissionService, "Upload")
export class TopProfileImageComponent {

    @Input() profile: noosfero.Profile;
    @Input() editable: boolean;
    picFile: any;

    constructor(private profileService: ProfileService,
        private permissionService: PermissionService,
        private Upload: angular.angularFileUpload.IUploadService) {
    }

    fileSelected(file: any, errFiles: any) {
        if (!file) return;
        this.Upload.dataUrl(file, true).then((dataUrl: any) => {
            let base64ImagesJson = this.getBase64ImageJson(dataUrl, file);
            this.profileService.uploadImage(this.profile, base64ImagesJson, "top").then((result: any) => {
                this.profile.top_image = result.data.top_image;
            });
        });
    }

    getBase64ImageJson(dataUrl: any, file: any): any {
        return {
            tempfile: this.getData(dataUrl),
            filename: this.getImageName(file.name),
            type: file.type
        };
    }

    getImageName(name: any): string {
        return this.profile.name + "_" + name;
    }

    getData(dataUrl: any): string {
        return dataUrl.substring(dataUrl.indexOf('base64,') + 7);
    }

    background() {
        let style: string = "position:absolute; left:0; right:0; height: 300px;";
        if (!this.profile || !this.profile.top_image) {
            return "background: green; " + style;
        } else {
            return "background-image: url('" + this.profile.top_image.url + "'); background-repeat: no-repeat; background-position:center; background-size:100% auto;" + style;
        }
    }

    isEditable() {
        return this.editable && this.permissionService.isAllowed(this.profile, 'allow_edit');
    }
}
