import { AuthService } from './../../login/auth.service';
import { SessionService } from './../../login/session.service';
import { NotificationService } from './../../shared/services/notification.service';
import { Inject, Input, Component } from '@angular/core';
import { ProfileService } from "../../../lib/ng-noosfero-api/http/profile.service";
import { PermissionService } from "../../shared/services/permission.service";
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

    nullImageFromApi = false;

    constructor(private profileService: ProfileService,
        private permissionService: PermissionService,
        private eventsHubService: EventsHubService,
        private notificationService: NotificationService,
        private authService: AuthService) {
    }

    upload(data: any) {
        this.profileService.uploadImage(this.profile, data, "profile").then((result: any) => {
            this.eventsHubService.emitEvent(this.eventsHubService.knownEvents.IMAGE_PROFILE_UPDATED, result.data);
            this.notificationService.success({ title: "profile.image.upload.success.title", message: "profile.image.upload.success.message" });
        });
    }

    isEditable() {
        return this.editable && this.profile && this.permissionService.isAllowed(this.profile, 'allow_edit');
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

        this.eventsHubService.subscribeToEvent(this.eventsHubService.knownEvents.IMAGE_PROFILE_UPDATED, (profile: noosfero.Profile) => {
            if (this.profile.id === profile.id) {
                this.authService.reloadUser();
                this.profile = profile;
            }
        });
    }

    showAlternativeProfileIcon() {
        return this.nullImageFromApi || !this.profile.image;
    }

}
