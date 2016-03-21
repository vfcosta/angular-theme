import {StateConfig, Component, Inject, provide} from 'ng-forward';
import {ProfileInfoComponent} from './info/profile-info.component';
import {ProfileHome} from './profile-home.component';
import {BasicEditorComponent} from '../article/basic-editor.component';
import {ContentViewerComponent} from "../article/content-viewer/content-viewer.component";
import {ContentViewerActions} from "../article/content-viewer/content-viewer-actions.component";
import {ActivitiesComponent} from "./activities/activities.component";
import {ProfileService} from "../../lib/ng-noosfero-api/http/profile.service";
import {NotificationService} from "../shared/services/notification.service";
import {MyProfile} from "./myprofile.component";


/**
 * @ngdoc controller
 * @name profile.Profile
 * @description
 *  This is the profile controller. It provide routes to supported Noosfero Profiles.
 */

@Component({
    selector: 'profile',
    templateUrl: "app/profile/profile.html",
    directives: [ActivitiesComponent],
    providers: [
        provide('profileService', { useClass: ProfileService }),
        provide('notificationService', { useClass: NotificationService })
    ]
})
@StateConfig([
    {
        name: 'main.profile.info',
        url: "^/profile/:profile",
        component: ProfileInfoComponent,
        views: {
            "mainBlockContent": {
                templateUrl: "app/profile/info/profile-info.html",
                controller: ProfileInfoComponent,
                controllerAs: "vm"
            }
        }
    },
    {
        name: 'main.profile.settings',
        url: "^/myprofile/:profile",
        component: MyProfile
    },
    {
        name: 'main.profile.cms',
        url: "^/myprofile/:profile/cms",
        component: BasicEditorComponent,
        views: {
            "mainBlockContent": {
                templateUrl: "app/article/basic-editor.html",
                controller: BasicEditorComponent,
                controllerAs: "vm"
            }
        }
    },
    {
        name: 'main.profile.home',
        url: "",
        component: ProfileHome,
        views: {
            "mainBlockContent": {
                controller: ProfileHome,
                controllerAs: "vm"
            }
        }
    },
    {
        name: 'main.profile.page',
        url: "/{page:any}",
        component: ContentViewerComponent,
        views: {
            "mainBlockContent": {
                templateUrl: "app/article/content-viewer/page.html",
                controller: ContentViewerComponent,
                controllerAs: "vm"
            },
            "actions@main": {
                templateUrl: "app/article/content-viewer/navbar-actions.html",
                controller: ContentViewerActions,
                controllerAs: "vm"
            }
        }
    }
])
@Inject(ProfileService, "$stateParams")
export class ProfileComponent {

    boxes: noosfero.Box[];
    profile: noosfero.Profile;

    constructor(profileService: ProfileService, $stateParams: ng.ui.IStateParamsService, notificationService: NotificationService) {
        profileService.setCurrentProfileByIdentifier($stateParams["profile"]).then((profile: noosfero.Profile) => {
            this.profile = profile;
            return profileService.getBoxes(<number>this.profile.id);
        }).then((response: restangular.IResponse) => {
            this.boxes = response.data.boxes;
        }).catch(() => {
            notificationService.error({ message: "notification.profile.not_found" });
        });
    }
}
