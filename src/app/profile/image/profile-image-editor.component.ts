import {StateConfig, Component, Input, Output, Inject, provide} from 'ng-forward';
import {TranslateProfile} from "../../shared/pipes/translate-profile.filter";
import {PersonService} from "../../../lib/ng-noosfero-api/http/person.service";

export class ProfileImageEditorComponent {

    activities: any;
    croppedDataUrl: string;
    static $inject = ["Upload", "$timeout", "$scope", "picFile", "profile", "personService", "$uibModalInstance"];

    constructor(
            private upload: any, private $timeout: any, private $scope: ng.IScope, 
            public picFile: any, private profile: noosfero.Profile, private personService: PersonService, 
            private $uibModalInstance: any) {
        //this.picFile = this.picFile;
        console.log("Value set: ", this.picFile);
    }

    uploadImage(dataUrl: any, name: any) {
        console.log("Uploading [" + name + "] with data: ", dataUrl);
        let data = dataUrl.substring(dataUrl.indexOf('base64,') + 7);
        let image_name = this.profile.name + "_" + name;
        let base64_image_json = {
            tempfile: data,
            filename: image_name,
            type: this.picFile.type
        };
        console.log("Base64Image JSON: ", base64_image_json);
        this.personService.uploadImage(this.profile, base64_image_json).then( (result: any) => {
            console.log("Upload finished: ", result);
            this.$uibModalInstance.close(name);
        });
    }
    
    uploadFiles(file: any, errFiles: any) {
        console.log("Going to upload: ", file);
        
        //$scope.f = file;
        let errFile = errFiles && errFiles[0];
        if (file) {
            let base64 = this.upload.base64DataUrl(file);
            console.log("Base64", base64);
            base64.then( (base64Urls: any) => {
                console.log("Uploading base64Urls: ", base64Urls);
                let data = base64Urls.substring(base64Urls.indexOf('base64,') + 7);
                let image_name = this.profile.name + "_" + file.name;
                let base64_image_json = {
                    tempfile: data,
                    filename: image_name,
                    type: file.type
                };
                console.log("Base64Image JSON: ", base64_image_json);
                this.personService.uploadImage(this.profile, base64_image_json);
            });
        }
    }    
    
    cancel() {
        this.$uibModalInstance.close();
    }
}
