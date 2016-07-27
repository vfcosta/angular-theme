import {StateConfig, Component, Input, Output, Inject, provide} from 'ng-forward';
import {TranslateProfile} from "../../shared/pipes/translate-profile.filter";
import {PersonService} from "../../../lib/ng-noosfero-api/http/person.service";

export class ProfileImageEditorComponent {

    activities: any;
    croppedDataUrl: string;
    static $inject = ["picFile", "profile", "personService", "$uibModalInstance"];

    constructor(public picFile: any, public profile: noosfero.Profile, public personService: PersonService,
        public $uibModalInstance: any) {
    }

    uploadImage(dataUrl: any, name: any) {
        let base64_image_json = this.getBase64ImageJson(dataUrl, name);
        this.personService.uploadImage(this.profile, base64_image_json).then( (result: any) => {
            this.$uibModalInstance.close(name);
        });
    }

    getBase64ImageJson(dataUrl: any, name: any) {
        let data = this.getData(dataUrl);
        let image_name = this.getImageName(name);
        return {
            tempfile: data,
            filename: image_name,
            type: this.picFile.type
        };
    }

    getImageName(name: any) {
        return this.profile.name + "_" + name;
    }

    getData(dataUrl: any) {
        return dataUrl.substring(dataUrl.indexOf('base64,') + 7);
    }

    cancel() {
        this.$uibModalInstance.close();
    }
}
