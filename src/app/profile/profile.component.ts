import {StateConfig, Component, Inject, provide} from 'ng-forward';
import {ProfileInfoComponent} from './info/profile-info.component';
import {ProfileHomeComponent} from './profile-home.component';
import {BasicEditorComponent} from '../article/cms/basic-editor/basic-editor.component';
import {CmsComponent} from '../article/cms/cms.component';
import {ContentViewerComponent} from "../article/content-viewer/content-viewer.component";
import {ContentViewerActionsComponent} from "../article/content-viewer/content-viewer-actions.component";
import {ActivitiesComponent} from "./activities/activities.component";
import {ProfileService} from "../../lib/ng-noosfero-api/http/profile.service";
import {NotificationService} from "../shared/services/notification.service";
import {MyProfileComponent} from "./myprofile.component";
import {ProfileActionsComponent} from "./profile-actions.component";

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
            },
            "actions@main": {
                templateUrl: "app/profile/navbar-actions.html",
                controller: ProfileActionsComponent,
                controllerAs: "vm"
            }
        }
    },
    {
        name: 'main.profile.settings',
        url: "^/myprofile/:profile",
        component: MyProfileComponent,
        views: {
            "actions@main": {
                templateUrl: "app/profile/navbar-actions.html",
                controller: ProfileActionsComponent,
                controllerAs: "vm"
            }
        }
    },
    {
        name: 'main.cms',
        url: "^/myprofile/:profile/cms?parent_id&type",
        component: CmsComponent,
        views: {
            "content": {
                templateUrl: "app/article/cms/cms.html",
                controller: CmsComponent,
                controllerAs: "vm"
            }
        }
    },
    {
        name: 'main.cmsEdit',
        url: "^/myprofile/:profile/cms/edit/:id",
        component: CmsComponent,
        views: {
            "content": {
                templateUrl: "app/article/cms/cms.html",
                controller: CmsComponent,
                controllerAs: "vm"
            }
        }
    },
    {
        name: 'main.profile.home',
        url: "",
        component: ProfileHomeComponent,
        views: {
            "mainBlockContent": {
                controller: ProfileHomeComponent,
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
                controller: ContentViewerActionsComponent,
                controllerAs: "vm"
            }
        }
    }
])
@Inject(ProfileService, "$stateParams", "$state")
export class ProfileComponent {

    boxes: noosfero.Box[];
    profile: noosfero.Profile;

    constructor(profileService: ProfileService, $stateParams: ng.ui.IStateParamsService, $state: ng.ui.IStateService, notificationService: NotificationService) {
        profileService.setCurrentProfileByIdentifier($stateParams["profile"]).then((profile: noosfero.Profile) => {
            this.profile = profile;
            return profileService.getBoxes(<number>this.profile.id);
        }).then((response: restangular.IResponse) => {
            this.boxes = response.data.boxes;
        }).catch(() => {
            $state.transitionTo('main.environment.home');
            notificationService.error({ message: "notification.profile.not_found" });
        });
    }
}
