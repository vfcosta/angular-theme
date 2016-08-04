import { Inject, Input, Component, provide } from "ng-forward";
import { ProfileService } from "../../../lib/ng-noosfero-api/http/profile.service";
import { PermissionService } from "../../shared/services/permission.service";
import { ProfileImageEditorComponent } from "./profile-image-editor.component";

/**
 * @ngdoc controller
 * @name components.noosfero.profile-image.ProfileImage
 * @description The component responsible for rendering the profile image
 * @exports ProfileImage
 */
@Component({
    selector: "noosfero-profile-image",
    templateUrl: 'app/profile/image/image.html',
    providers: [provide('profileService', { useClass: ProfileService })]
})
@Inject(ProfileService, PermissionService, "$uibModal", "$scope")
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

    constructor(private profileService: ProfileService, private permissionService: PermissionService, private $uibModal: ng.ui.bootstrap.IModalService, private $scope: ng.IScope) {
    }

    fileSelected(file: any, errFiles: any) {
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
                    profileService: this.profileService
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

    isEditable() {
        return this.editable && this.permissionService.isAllowed(this.profile, 'allow_edit');
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

}
