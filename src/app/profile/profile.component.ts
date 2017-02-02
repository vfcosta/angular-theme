import { StateConfig, Component, Inject, provide, Input } from 'ng-forward';
import { ProfileHomeComponent } from './profile-home.component';
import { BasicEditorComponent } from '../article/cms/basic-editor/basic-editor.component';
import { CmsComponent } from '../article/cms/cms.component';
import { ContentViewerComponent } from "../article/content-viewer/content-viewer.component";
import { ActivitiesComponent } from "./activities/activities.component";
import { ProfileDataComponent } from "./data/profile-data.component";
import { ProfileService } from "../../lib/ng-noosfero-api/http/profile.service";
import { NotificationService } from "../shared/services/notification.service";
import { MyProfileComponent } from "./myprofile.component";
import { TasksComponent } from "../task/tasks/tasks.component";
import { DestroyProfileComponent } from "./destroy/destroy-profile.component";
import { ProfileActionsComponent } from "./actions/profile-actions.component";

/**
 * @ngdoc controller
 * @name profile.Profile
 * @description
 *  This is the profile controller. It provide routes to supported Noosfero Profiles.
 */

@Component({
    selector: 'profile',
    templateUrl: "app/profile/profile.html",
    directives: [ActivitiesComponent, ProfileActionsComponent],
    providers: [
        provide('profileService', { useClass: ProfileService }),
        provide('notificationService', { useClass: NotificationService })
    ]
})
@StateConfig([
    {
        name: 'main.profile.info',
        url: "^/profile/:profile",
        component: ActivitiesComponent,
        views: {
            "mainBlockContent": {
                templateUrl: "app/profile/activities/activities.html",
                controller: ActivitiesComponent,
                controllerAs: "ctrl"
            }
        }
    },
    {
        name: 'main.profile.about',
        url: "^/profile/:profile/about",
        component: ProfileDataComponent,
        views: {
            "mainBlockContent": {
                templateUrl: "app/profile/data/profile-data.html",
                controller: ProfileDataComponent,
                controllerAs: "ctrl"
            }
        }
    },
    {
        name: 'main.profile.settings',
        url: "^/myprofile/:profile",
        component: MyProfileComponent
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
        name: 'main.profile.tasks',
        url: "^/myprofile/:profile/tasks",
        component: TasksComponent,
        views: {
            "mainBlockContent": {
                templateUrl: "app/task/tasks/tasks.html",
                controller: TasksComponent,
                controllerAs: "vm"
            }
        }
    },
    {
        name: 'main.profile.home.destroy',
        url: "^/myprofile/:profile/profile_editor/destroy_profile",
        component: DestroyProfileComponent,
        views: {
            "actions@main": {
                template: "<div></div>",
                controller: DestroyProfileComponent,
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
            }
        }
    }
])
@Inject(ProfileService, "$stateParams", "$state")
export class ProfileComponent {

    boxes: noosfero.Box[];
    @Input() profile: noosfero.Profile;

    constructor(private profileService: ProfileService, $stateParams: ng.ui.IStateParamsService, private $state: ng.ui.IStateService, private notificationService: NotificationService) {
        let profilePromise: Promise<noosfero.Profile>;
        if (this.$state.params['currentProfile'].id) {
            this.profile = this.$state.params['currentProfile'];
            profilePromise = Promise.resolve(this.profile);
        } else {
            profilePromise = profileService.getByIdentifier($stateParams["profile"]);
        }
        profilePromise.then((profile: noosfero.Profile) => {
            this.profile = profile;
            profileService.setCurrentProfile(this.profile);
            return this.profileService.getBoxes(<number>this.profile.id);
        }).then((response: restangular.IResponse) => {
            this.boxes = response.data.boxes;
        }).catch(() => {
            this.$state.transitionTo('main.domain');
            this.notificationService.error({ message: "notification.profile.not_found" });
        });
    }
}
