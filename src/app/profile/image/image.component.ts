import {Inject, Input, Component, provide} from "ng-forward";
import {PersonService} from "../../../lib/ng-noosfero-api/http/person.service";
import {ProfileImageEditorComponent} from "./profile-image-editor.component";

/**
 * @ngdoc controller
 * @name components.noosfero.profile-image.ProfileImage
 * @description The component responsible for rendering the profile image
 * @exports ProfileImage
 */
@Component({
    selector: "noosfero-profile-image",
    templateUrl: 'app/profile/image/image.html',
    providers: [ provide('personService',  { useClass: PersonService }) ]
})
@Inject(PersonService, "$uibModal", "Upload", "$timeout", "$scope")
export class ProfileImageComponent {

    /**
     * @ngdoc property
     * @name profile
     * @propertyOf components.noosfero.profile-image.ProfileImage
     * @description 
     *  The Noosfero {@link models.Profile} holding the image.
     */
    @Input() profile: noosfero.Profile;
    /**
     * @ngdoc property
     * @name defaultIcon
     * @propertyOf components.noosfero.profile-image.ProfileImage
     * @descritpion
     *  The default icon used by this profile
     */
    defaultIcon: string;
    
    @Input() editable: boolean;
    
    @Input() editClass: string;

    picFile: any;
    croppedDataUrl: any;
    modalInstance: any;

    constructor(private personService: PersonService, private $uibModal: any, private Upload: any, 
            private $timeout: any, private $scope: ng.IScope) {
        //console.log("ImageComponent.Created with upload: ", this.Upload);
        //console.log("ImageComponent.Cropped: ", this.croppedDataUrl);
        //console.log("ImageComponent.PicFile: ", this.picFile);
    }
    
    fileSelected(file: any, errFiles: any) {
        console.log("File selected: ", file);
        if (file) {
            this.picFile = file;
            this.modalInstance = this.$uibModal.open({
                templateUrl: 'app/profile/image/profile-image-editor.html',
                controller: ProfileImageEditorComponent,
                controllerAs: 'ctrl',
                scope: this.$scope,
                bindToController: true,
                backdrop: 'static',
                resolve: {
                    picFile: this.picFile,
                    profile: this.profile,
                    personService: this.personService
                }
            });
        }
    }
    
    private _showCamera: boolean = false;
    
    showChange(show: boolean) {
        this._showCamera = show;
    }
    
    showCamera() {
        return this._showCamera;
    }
    
    
    /**
     * @ngdoc method
     * @name ngOnInit
     * @methodOf components.noosfero.profile-image.ProfileImage
     * @description 
     *  Initializes the icon names to their corresponding values depending on the profile type passed to the controller 
     */
    ngOnInit() {
        this.defaultIcon = 'fa-users';
        if (this.profile && this.profile.type === 'Person') {
            this.defaultIcon = 'fa-user';
        }
    }
    
    ngAfterViewInit() {
        console.log("Parent scope: ", this.$scope.$parent['ctrl']['__proto__']);
        console.log("Editable: " + this.editable);
        console.log("Edit_class: " + this.editClass);
    }
}

