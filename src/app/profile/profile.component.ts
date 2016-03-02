import {StateConfig, Component, Inject} from 'ng-forward';
import {ProfileInfo} from '../profile-info/profile-info.component';
import {ProfileHome} from '../profile/profile-home.component';
import {Cms} from '../cms/cms.component';
import {ContentViewer} from "../content-viewer/content-viewer.component";

import * as noosferoModels from "./../models/interfaces";

@Component({
    selector: 'profile',
    templateUrl: "app/profile/profile.html"
})
@StateConfig([
    {
        name: 'main.profile.info',
        url: "^/profile/:profile",
        component: ProfileInfo,
        views: {
            "mainBlockContent": {
                templateUrl: "app/profile-info/profile-info.html",
                controller: "ProfileInfoController",
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
                controller: "CmsController",
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
                controller: "ProfileHomeController",
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
                controller: "ContentViewerController",
                controllerAs: "vm"
            },
            "actions@main": {
                templateUrl: "app/content-viewer/navbar-actions.html",
                controller: "ContentViewerActionsController",
                controllerAs: "vm"
            }
        }
    }
])
@Inject("noosfero", "$log", "$stateParams")
export class Profile {

    boxes: noosferoModels.Box[];
    profile: noosferoModels.Profile;

    constructor(noosfero: any, $log: ng.ILogService, $stateParams: ng.ui.IStateParamsService) {
        noosfero.profiles.one().get({ identifier: $stateParams["profile"] }).then((response: restangular.IResponse) => {
            this.profile = response.data[0];
            noosfero.setCurrentProfile(this.profile);
            return noosfero.boxes(this.profile.id).one().get();
        }).then((response: restangular.IResponse) => {
            this.boxes = response.data.boxes;
        });
    }
}
