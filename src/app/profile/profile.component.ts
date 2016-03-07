import {StateConfig, Component, Inject} from 'ng-forward';
import {ProfileInfo} from '../profile-info/profile-info.component';
import {ProfileHome} from '../profile/profile-home.component';
import {Cms} from '../cms/cms.component';
import {ContentViewer} from "../content-viewer/content-viewer.component";
import {ContentViewerActions} from "../content-viewer/content-viewer-actions.component";
import {NoosferoActivities} from "../components/noosfero-activities/activities.component";
import {ProfileService} from "../../lib/ng-noosfero-api/http/profile.service";

import * as noosferoModels from "./../models/interfaces";

@Component({
    selector: 'profile',
    templateUrl: "app/profile/profile.html",
    directives: [NoosferoActivities]
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
@Inject(ProfileService, "noosfero", "$log", "$stateParams")
export class Profile {

    boxes: noosferoModels.Box[];
    profile: noosferoModels.Profile;

    constructor(ProfileService: ProfileService, noosfero: any, $log: ng.ILogService, $stateParams: ng.ui.IStateParamsService) {
        ProfileService.getByIdentifier($stateParams["profile"]).then((response: restangular.IResponse) => {
            this.profile = response.data[0];
            noosfero.setCurrentProfile(this.profile);
            return ProfileService.getBoxes(this.profile.id);
        }).then((response: restangular.IResponse) => {
            this.boxes = response.data.boxes;
        });
    }
}
