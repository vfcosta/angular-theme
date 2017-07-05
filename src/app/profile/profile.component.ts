import { ThemeService } from './../shared/services/theme.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DesignModeService } from './../shared/services/design-mode.service';
import { Component, Inject, Input } from '@angular/core';
import { ProfileHomeComponent } from './profile-home.component';
import { CmsComponent } from '../article/cms/cms.component';
import { ContentViewerComponent } from "../article/content-viewer/content-viewer.component";
import { ActivitiesComponent } from "./activities/activities.component";
import { ProfileAboutComponent } from "./about/profile-about.component";
import { ProfileService } from "../../lib/ng-noosfero-api/http/profile.service";
import { NotificationService } from "../shared/services/notification.service";
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
    template: require("app/profile/profile.html"),
})
export class ProfileComponent {

    @Input() profile: noosfero.Profile;

    constructor(private profileService: ProfileService, private route: ActivatedRoute,
        private notificationService: NotificationService, private designModeService: DesignModeService,
        private router: Router, private themeService: ThemeService) {

        designModeService.setInDesignMode(false);
        this.profile = route.snapshot.data['profile'];
        this.themeService.verifyTheme(this.profile.theme);
    }
}
