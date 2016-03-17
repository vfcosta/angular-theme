import {Inject, Input, Component} from "ng-forward";
import {Profile} from "./../../../models/interfaces";


/**
 * @ngdoc controller
 * @name components.noosfero.profile-image.ProfileImage
 * @description The component responsible for rendering the profile image
 * @exports ProfileImage
 */
@Component({
    selector: "noosfero-profile-image",
    templateUrl: 'app/components/noosfero/profile-image/profile-image.html',
})
export class ProfileImage {

    
    /**
     * @ngdoc property
     * @name profile
     * @propertyOf components.noosfero.profile-image.ProfileImage
     * @description 
     *  The Noosfero {@link models.Profile} holding the image.
     */
    @Input() profile: Profile;
    /**
     * @ngdoc property
     * @name defaultIcon
     * @propertyOf components.noosfero.profile-image.ProfileImage
     * @descritpion
     *  The default icon used by this profile
     */    
    defaultIcon: string;
    
    
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

