import {StateConfig, Component, Inject} from 'ng-forward';
import {ProfileInfo} from '../profile-info/profile-info.component'
import {Cms} from '../cms/cms.component'

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
])
@Inject("noosfero", "$log", "$stateParams")
export class Profile {

    boxes: any
    profile: any

    constructor(noosfero, $log, $stateParams) {
        noosfero.profiles.one().get({ identifier: $stateParams.profile }).then((response) => {
            this.profile = response.data[0];
            noosfero.setCurrentProfile(this.profile);
            return noosfero.boxes(this.profile.id).one().get();
        }).then((response) => {
            this.boxes = response.data.boxes;
        });
    }
}
