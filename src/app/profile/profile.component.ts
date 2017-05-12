import { ThemeService } from './../shared/services/theme.service';
import { DesignModeService } from './../shared/services/design-mode.service';
import { Component, Inject, provide, Input } from 'ng-forward';
import { ProfileHomeComponent } from './profile-home.component';
import { BasicEditorComponent } from '../article/cms/basic-editor/basic-editor.component';
import { CmsComponent } from '../article/cms/cms.component';
import { ContentViewerComponent } from "../article/content-viewer/content-viewer.component";
import { ActivitiesComponent } from "./activities/activities.component";
import { ProfileAboutComponent } from "./about/profile-about.component";
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
    directives: [ActivitiesComponent],
    providers: [
        provide('profileService', { useClass: ProfileService }),
        provide('notificationService', { useClass: NotificationService }),
        provide('designModeService', { useClass: DesignModeService }),
        provide('themeService', { useClass: ThemeService }),
    ]
})
@Inject(ProfileService, "$stateParams", "$state", NotificationService, DesignModeService, ThemeService)
export class ProfileComponent {

    boxes: noosfero.Box[];
    @Input() profile: noosfero.Profile;

    constructor(private profileService: ProfileService, $stateParams: ng.ui.IStateParamsService, private $state: ng.ui.IStateService,
        private notificationService: NotificationService, private designModeService: DesignModeService,
        private themeService: ThemeService) {
        designModeService.setInDesignMode(false);
        let profilePromise: Promise<noosfero.Profile>;
        if (this.$state.params['currentProfile'].id) {
            this.profile = this.$state.params['currentProfile'];
            profilePromise = Promise.resolve(this.profile);
        } else {
            profilePromise = profileService.setCurrentProfileByIdentifier($stateParams["profile"]);
        }
        profilePromise.then((profile: noosfero.Profile) => {
            if (themeService.verifyTheme(profile.theme)) return <Promise<restangular.IResponse>>new Promise(() => {}); // return an empty promise to break promise chain
            this.profile = profile;
            profileService.setCurrentProfile(this.profile);
            return this.profileService.getBoxes(<number>this.profile.id);
        }).then((response: restangular.IResponse) => {
            this.profile.boxes = response.data;
            this.boxes = response.data;
        }).catch(() => {
            this.$state.transitionTo('main.domain');
            this.notificationService.error({ message: "notification.profile.not_found" });
        });
    }
}
