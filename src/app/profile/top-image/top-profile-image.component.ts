import { Inject, Input, Output, Component, provide } from "ng-forward";
import { ProfileService } from "../../../lib/ng-noosfero-api/http/profile.service";
import { PermissionService } from "../../shared/services/permission.service";
import { EventsHubService } from "../../shared/services/events-hub.service";
import { NoosferoKnownEvents } from "../../known-events";

/**
 * @ngdoc controller
 * @name components.noosfero.top-profile-image.ProfileImage
 * @description The component responsible for rendering the profile image
 * @exports ProfileImage
 */
@Component({
    selector: "noosfero-top-profile-image",
    templateUrl: 'app/profile/top-image/top-profile-image.html',
    providers: [
        provide('profileService', { useClass: ProfileService }),
        provide('eventsHubService', { useClass: EventsHubService })
    ]
})
@Inject(ProfileService, PermissionService, "$uibModal", "$scope", EventsHubService, "Upload")
export class TopProfileImageComponent {

    /**
     * @ngdoc property
     * @name profile
     * @propertyOf components.noosfero.top-profile-image.ProfileImage
     * @description
     *  The Noosfero {@link models.Profile} holding the image.
     */
    @Input() profile: noosfero.Profile;
    /**
     * @ngdoc property
     * @name defaultIcon
     * @propertyOf components.noosfero.top-profile-image.ProfileImage
     * @descritpion
     *  The default icon used by this profile
     */
    defaultIcon: string;

    @Input() iconSize: string;
    @Input() editable: boolean;

    picFile: any;
    modalInstance: any;
    eventsNames: NoosferoKnownEvents;

    constructor(private profileService: ProfileService,
        private permissionService: PermissionService,
        private $uibModal: ng.ui.bootstrap.IModalService,
        private $scope: ng.IScope,
        private eventsHubService: EventsHubService,
        private Upload: angular.angularFileUpload.IUploadService) {

        this.eventsNames = new NoosferoKnownEvents();
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

    background(){
        let style : string  = "position:absolute; left:0; right:0; height: 300px;";
        if (!this.profile.top_image) {
            return "background: green; "+ style;
        } else { 
            return "background-image: url('"+this.profile.top_image.url +"'); background-repeat: no-repeat; background-position:center; background-size:100% auto;" + style;
        }
    }

    isEditable() {
        return this.editable && this.permissionService.isAllowed(this.profile, 'allow_edit');
    }

    /**
     * @ngdoc method
     * @name ngOnInit
     * @methodOf components.noosfero.top-profile-image.ProfileImage
     * @description
     *  Initializes the icon names to their corresponding values depending on the profile type passed to the controller
     */
    ngOnInit() {
        
        this.iconSize = "fa-5x";
        this.defaultIcon = 'fa-users';
        if (this.profile && this.profile.type === 'Person') {
            this.defaultIcon = 'fa-user';
        }

        this.eventsHubService.subscribeToEvent(this.eventsNames.IMAGE_PROFILE_UPDATED, (profile: noosfero.Profile) => {
            this.profile = profile;
        });
    }

}
