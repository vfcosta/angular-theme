import {StateConfig, Component, Inject, provide} from 'ng-forward';
import {ProfileInfo} from '../profile-info/profile-info.component';
import {ProfileHome} from '../profile/profile-home.component';
import {Cms} from '../cms/cms.component';
import {ContentViewer} from "../content-viewer/content-viewer.component";
import {ContentViewerActions} from "../content-viewer/content-viewer-actions.component";
import {NoosferoActivities} from "../components/noosfero-activities/activities.component";
import {ProfileService} from "../../lib/ng-noosfero-api/http/profile.service";
import {Notification} from "../components/notification/notification.component";

@Component({
    selector: 'profile',
    templateUrl: "app/profile/profile.html",
    directives: [NoosferoActivities],
    providers: [
        provide('profileService', { useClass: ProfileService }),
        provide('notification', { useClass: Notification })
    ]
})
@StateConfig([
    {
        name: 'main.profile.info',
        url: "^/profile/:profile",
        component: ProfileInfo,
        views: {
            "mainBlockContent": {
                templateUrl: "app/profile-info/profile-info.html",
                controller: ProfileInfo,
                controllerAs: "vm"
            }
        }
    },
    {
        name: 'main.profile.cms',
        url: "^/myprofile/:profile/cms",
        component: Cms,
        views: {
            "mainBlockContent": {
                templateUrl: "app/cms/cms.html",
                controller: Cms,
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
        component: ContentViewer,
        views: {
            "mainBlockContent": {
                templateUrl: "app/content-viewer/page.html",
                controller: ContentViewer,
                controllerAs: "vm"
            },
            "actions@main": {
                templateUrl: "app/content-viewer/navbar-actions.html",
                controller: ContentViewerActions,
                controllerAs: "vm"
            }
        }
    }
])
@Inject(ProfileService, "$stateParams")
export class Profile {

    boxes: noosfero.Box[];
    profile: noosfero.Profile;

    constructor(profileService: ProfileService, $stateParams: ng.ui.IStateParamsService, notification: Notification) {
        profileService.setCurrentProfileByIdentifier($stateParams["profile"]).then((profile: noosfero.Profile) => {
            this.profile = profile;
            return profileService.getBoxes(<number>this.profile.id);
        }).then((response: restangular.IResponse) => {
            this.boxes = response.data.boxes;
        }).catch(() => {
            notification.error("notification.profile.not_found");
        });
    }
}
