import { PasswordComponent } from './login/new-password.component';
import { RegisterComponent } from './account/register.component';
import { ContentViewerComponent } from './article/content-viewer/content-viewer.component';
import { DestroyProfileComponent } from './profile/destroy/destroy-profile.component';
import { TasksComponent } from './task/tasks/tasks.component';
import { CmsComponent } from './article/cms/cms.component';
import { MyProfileComponent } from './profile/myprofile.component';
import { ProfileAboutComponent } from './profile/about/profile-about.component';
import { ProfileHomeComponent } from './profile/profile-home.component';
import { ActivitiesComponent } from './profile/activities/activities.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { MainContentComponent } from "./main";
import { DomainComponent } from "./domain/domain.component";
import { AuthService } from "./login/auth.service";
import { EnvironmentService } from "./../lib/ng-noosfero-api/http/environment.service";
import { DomainService } from "./../lib/ng-noosfero-api/http/domain.service";
import { EnvironmentComponent } from "./environment/environment.component";
import { EnvironmentHomeComponent } from "./environment/environment-home.component";

/** @ngInject */
export function noosferoRoutes($stateProvider: any) {
    $stateProvider.state({
        controller: MainContentComponent,
        url: '',
        templateUrl: "app/main/main.html",
        abstract: true,
        name: 'main',
        resolve: {
            currentUser: function(AuthService: AuthService) {
                return AuthService.loginFromCookie();
            }
        }
    });

    $stateProvider.state({
        controller: EnvironmentComponent,
        url: '/',
        name: 'main.environment',
        views: {
            "content": {
                templateUrl: "app/environment/environment.html",
                controller: EnvironmentComponent,
                controllerAs: "ctrl"
            }
        },
        params: { environment: {} }
    });

    $stateProvider.state({
        controller: EnvironmentHomeComponent,
        url: '',
        name: 'main.environment.home',
        views: {
            "mainBlockContent": {
                templateUrl: "app/environment/environment-home.html",
                controller: EnvironmentHomeComponent,
                controllerAs: "vm"
            }
        },
        params: { environment: {} }
    });

    $stateProvider.state({
        controller: DomainComponent,
        url: '/',
        name: 'main.domain',
        views: {
            "content": {
                template: "<div></div>",
                controller: DomainComponent,
                controllerAs: "ctrl"
            }
        },
        resolve: {
            contextResult: (DomainService: DomainService) => {
                return DomainService.get("context");
            }
        }
    });

    $stateProvider.state({
        controller: SearchComponent,
        url: '^/search?query&per_page',
        name: 'main.environment.search',
        views: {
            "mainBlockContent": {
                templateUrl: "app/search/search.html",
                controller: SearchComponent,
                controllerAs: "ctrl"
            }
        }
    });

    $stateProvider.state({
        url: "^/:profile",
        abstract: true,
        controller: ProfileComponent,
        name: 'main.profile',
        views: {
            "content": {
                templateUrl: "app/profile/profile.html",
                controller: ProfileComponent,
                controllerAs: "ctrl"
            }
        },
        params: { currentProfile: {} }
    });

    $stateProvider.state({
        name: 'main.profile.info',
        url: "^/profile/:profile",
        controller: ActivitiesComponent,
        views: {
            "mainBlockContent": {
                templateUrl: "app/profile/activities/activities.html",
                controller: ActivitiesComponent,
                controllerAs: "ctrl"
            }
        }
    });

    $stateProvider.state({
        name: 'main.profile.home',
        url: "",
        controller: ProfileHomeComponent,
        views: {
            "mainBlockContent": {
                controller: ProfileHomeComponent,
                controllerAs: "vm"
            }
        }
    });

    $stateProvider.state({
        name: 'main.profile.about',
        url: "^/profile/:profile/about",
        controller: ProfileAboutComponent,
        views: {
            "mainBlockContent": {
                templateUrl: "app/profile/about/profile-about.html",
                controller: ProfileAboutComponent,
                controllerAs: "ctrl"
            }
        }
    });

    $stateProvider.state({
        name: 'main.profile.settings',
        url: "^/myprofile/:profile",
        controller: MyProfileComponent
    });

    $stateProvider.state({
        name: 'main.cms',
        url: "^/myprofile/:profile/cms?parent_id&type",
        controller: CmsComponent,
        views: {
            "content": {
                templateUrl: "app/article/cms/cms.html",
                controller: CmsComponent,
                controllerAs: "vm"
            }
        }
    });

    $stateProvider.state({
        name: 'main.cmsEdit',
        url: "^/myprofile/:profile/cms/edit/:id",
        controller: CmsComponent,
        views: {
            "content": {
                templateUrl: "app/article/cms/cms.html",
                controller: CmsComponent,
                controllerAs: "vm"
            }
        }
    });

    $stateProvider.state({
        name: 'main.profile.tasks',
        url: "^/myprofile/:profile/tasks",
        controller: TasksComponent,
        views: {
            "mainBlockContent": {
                templateUrl: "app/task/tasks/tasks.html",
                controller: TasksComponent,
                controllerAs: "ctrl"
            }
        }
    });

    $stateProvider.state({
        name: 'main.profile.home.destroy',
        url: "^/myprofile/:profile/profile_editor/destroy_profile",
        controller: DestroyProfileComponent,
        views: {
            "actions@main": {
                template: "<div></div>",
                controller: DestroyProfileComponent,
                controllerAs: "vm"
            }
        }
    });

    $stateProvider.state({
        name: 'main.profile.page',
        url: "/{page:any}",
        controller: ContentViewerComponent,
        views: {
            "mainBlockContent": {
                templateUrl: "app/article/content-viewer/page.html",
                controller: ContentViewerComponent,
                controllerAs: "vm"
            }
        }
    });

    $stateProvider.state({
        name: 'main.register',
        url: "/account/signup",
        controller: RegisterComponent,
        views: {
            "content": {
                templateUrl: "app/account/register.html",
                controller: RegisterComponent,
                controllerAs: "vm"
            }
        }
    });

    $stateProvider.state({
        name: 'main.newPasswd',
        url: "/account/new_password/:code",
        controller: PasswordComponent,
        views: {
            "content": {
                templateUrl: "app/login/new-password.html",
                controller: PasswordComponent,
                controllerAs: "vm"
            }
        }
    });
}