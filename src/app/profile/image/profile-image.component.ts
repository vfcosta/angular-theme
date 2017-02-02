import { Inject, Input, Component } from '@angular/core';
import { ProfileService } from "../../../lib/ng-noosfero-api/http/profile.service";
import { PermissionService } from "../../shared/services/permission.service";
import { ProfileImageEditorComponent } from "./profile-image-editor.component";
import { EventsHubService } from "../../shared/services/events-hub.service";
import { NoosferoKnownEvents } from "../../known-events";

/**
 * @ngdoc controller
 * @name components.noosfero.profile-image.ProfileImage
 * @description The component responsible for rendering the profile image
 * @exports ProfileImage
 */
@Component({
    selector: "noosfero-profile-image",
    template: require('app/profile/image/profile-image.html')
})
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

    @Input() iconSize: string;
    @Input() editable: boolean;

    picFile: any;
    modalInstance: any;
    eventsNames: NoosferoKnownEvents;

    constructor( @Inject("profileService") private profileService: ProfileService,
        @Inject("permissionService") private permissionService: PermissionService,
        @Inject("$uibModal") private $uibModal: ng.ui.bootstrap.IModalService,
        @Inject("$scope") private $scope: ng.IScope,
        @Inject("eventsHubService") private eventsHubService: EventsHubService) {

        this.eventsNames = new NoosferoKnownEvents();
    }

    fileSelected($event: any) {
        if (!$event) return;
        let file: File = $event.target.files[0];
        if (!file) return;
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
                profileService: this.profileService,
                eventsHubService: this.eventsHubService
            }
        });
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
        this.iconSize = "fa-5x";
        this.defaultIcon = 'fa-users';
        if (this.profile && this.profile.type === 'Person') {
            this.defaultIcon = 'fa-user';
        }

        this.eventsHubService.subscribeToEvent(this.eventsNames.IMAGE_PROFILE_UPDATED, (profile: noosfero.Profile) => {
            if (this.profile.id === profile.id) {
                this.profile = profile;
            }
        });
    }

}
