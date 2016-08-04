import { StateConfig, Component, Input, Output, Inject, provide } from 'ng-forward';
import { TranslateProfile } from "../../shared/pipes/translate-profile.filter";
import { ProfileService } from "../../../lib/ng-noosfero-api/http/profile.service";

export class ProfileImageEditorComponent {

    croppedDataUrl: string;
    static $inject = ["picFile", "profile", "profileService", "$uibModalInstance"];

    constructor(public picFile: any, public profile: noosfero.Profile, public profileService: ProfileService,
        public modalInstance: ng.ui.bootstrap.IModalServiceInstance) {
    }

    uploadImage(dataUrl: any, name: any) {
        let base64ImageJson = this.getBase64ImageJson(dataUrl, name);
        this.profileService.uploadImage(this.profile, base64ImageJson).then((result: any) => {
            this.modalInstance.close(name);
        });
    }

    getBase64ImageJson(dataUrl: any, name: any): any {
        let data = this.getData(dataUrl);
        let image_name = this.getImageName(name);
        return {
            tempfile: data,
            filename: image_name,
            type: this.picFile.type
        };
    }

    getImageName(name: any): string {
        return this.profile.name + "_" + name;
    }

    getData(dataUrl: any): string {
        return dataUrl.substring(dataUrl.indexOf('base64,') + 7);
    }

    cancel() {
        this.modalInstance.close();
    }
}
