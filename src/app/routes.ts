import { RouteNg2 } from './shared/components/route-ng2/route-ng2.component';
import { ProfileConfigurationOptionComponent } from './profile/configuration/profile-configuration-option.component';
import { ProfilePersonalDataComponent } from './profile/configuration/personal-data/profile-personal-data.component';
import { ProfileConfigurationComponent } from './profile/configuration/profile-configuration.component';
import { PasswordComponent } from './login/new-password.component';
import { RegisterComponent } from './account/register.component';
import { ContentViewerComponent } from './article/content-viewer/content-viewer.component';
import { DestroyProfileComponent } from './profile/destroy/destroy-profile.component';
import { TasksComponent } from './task/tasks/tasks.component';
import { CmsComponent } from './article/cms/cms.component';
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
import { CommunityMembersProfileComponent } from './profile/community-members/community-members-profile.component';
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
        resolve: {
            environment: (environmentService: EnvironmentService) => {
                return environmentService.get('default').then((result: noosfero.RestResult<noosfero.Environment>) => {
                    environmentService.setCurrentEnvironment(result.data);
                    return result.data;
                });
            }
        }
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
        }
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
        controller: RouteNg2,
        url: '^/search?query&per_page',
        name: 'main.environment.search',
        views: {
            "mainBlockContent": {
                template: "<search></search>",
                controller: RouteNg2,
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
        params: { currentProfile: {} },
        resolve: {
            environment: (EnvironmentService: EnvironmentService) => {
                return EnvironmentService.get('default').then((result: noosfero.RestResult<noosfero.Environment>) => {
                    EnvironmentService.setCurrentEnvironment(result.data);
                    return result.data;
                });
            }
        }
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
        url: "^/myprofile/:profile/tasks/:taskTypes",
        views: {
            "mainBlockContent": {
                template: '<tasks [task-types]="ctrl.$stateParams[\'taskTypes\']"></tasks>',
                controllerAs: "ctrl",
                controller: RouteNg2
            }
        }
    });

    $stateProvider.state({
        name: 'main.myprofile.destroy',
        url: "/destroy_profile",
        controller: DestroyProfileComponent,
        views: {
            "myprofileContent": {
                template: "<div></div>",
                controller: DestroyProfileComponent,
                controllerAs: "ctrl"
            }
        }
    });

    $stateProvider.state({
        name: 'main.register',
        url: "/account/signup",
        views: {
            "content": {
                templateUrl: "app/account/register.html",
                controller: RouteNg2,
                controllerAs: "vm"
            }
        }
    });
    $stateProvider.state({
        name: 'main.newPasswd',
        url: "/account/new_password/:code",
        views: {
            "content": {
                template: '<new-password [code]="ctrl.$stateParams[\'code\']"></new-password>',
                controller: RouteNg2,
                controllerAs: "ctrl"
            }
        }
    });    
    $stateProvider.state({
        name: 'main.profile.members',
        url: "^/profile/:profile/members",
        controller: CommunityMembersProfileComponent,
        views: {
            "mainBlockContent": {
                templateUrl: "app/profile/community-members/community-members-profile.html",
                controller: CommunityMembersProfileComponent,
                controllerAs: "ctrl"
            }
        }
    });
    $stateProvider.state({
        name: 'main.profile.friends',
        url: "^/profile/:profile/friends",
        controller: ProfileConfigurationOptionComponent,
        views: {
            "mainBlockContent": {
                template: "<person-friends ng-if='ctrl.profile' [profile]='ctrl.profile'></person-friends>",
                controller: ProfileConfigurationOptionComponent,
                controllerAs: "ctrl"
            }
        }
    });
    $stateProvider.state({
        name: 'main.myprofile',
        url: "^/myprofile/:profile",
        controller: ProfileConfigurationComponent,
        views: {
            "content": {
                templateUrl: "app/profile/configuration/profile-configuration.html",
                controller: ProfileConfigurationComponent,
                controllerAs: "ctrl"
            }
        }
    });
    $stateProvider.state({
        name: 'main.myprofile.personal_data',
        url: "/personal_data",
        controller: ProfileConfigurationOptionComponent,
        views: {
            "myprofileContent": {
                template: "<profile-personal-data ng-if='ctrl.profile' [profile]='ctrl.profile'></profile-personal-data>",
                controller: ProfileConfigurationOptionComponent,
                controllerAs: "ctrl"
            }
        }
    });
    $stateProvider.state({
        name: 'main.myprofile.communities',
        url: "/communities?search",
        controller: ProfileConfigurationOptionComponent,
        views: {
            "myprofileContent": {
                template: "<person-communities ng-if='ctrl.profile' [profile]='ctrl.profile'></person-communities>",
            }
        }
    });
    $stateProvider.state({
        name: 'main.myprofile.friends',
        url: "/friends?search",
        controller: ProfileConfigurationOptionComponent,
        views: {
            "myprofileContent": {
                template: "<person-friends ng-if='ctrl.profile' [profile]='ctrl.profile'></person-friends>",
                controller: ProfileConfigurationOptionComponent,
                controllerAs: "ctrl"
            }
        }
    });
    $stateProvider.state({
        name: 'main.myprofile.members',
        url: "/members?search",
        controller: ProfileConfigurationOptionComponent,
        views: {
            "myprofileContent": {
                template: "<noosfero-community-members-my-profile ng-if='ctrl.profile' [profile]='ctrl.profile'></noosfero-community-members-my-profile>",
                controller: ProfileConfigurationOptionComponent,
                controllerAs: "ctrl"
            }
        }
    });

    $stateProvider.state({
        name: 'main.myprofile.community_new',
        url: "/community/new",
        controller: ProfileConfigurationOptionComponent,
        views: {
            "myprofileContent": {
                template: "<new-community ng-if='ctrl.profile' [profile]='ctrl.profile'></new-community>",
                controller: ProfileConfigurationOptionComponent,
                controllerAs: "ctrl"
            }
        }
    });

    $stateProvider.state({
        name: 'main.myprofile.community_edit',
        url: "/community/edit",
        controller: ProfileConfigurationOptionComponent,
        views: {
            "myprofileContent": {
                template: "<edit-community ng-if='ctrl.profile' [profile]='ctrl.profile'></edit-community>",
                controller: ProfileConfigurationOptionComponent,
                controllerAs: "ctrl"
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
        name: 'main.myprofile.change_password',
        url: "/change_password",
        controller: ProfileConfigurationOptionComponent,
        views: {
            "myprofileContent": {
                template: "<change-password ng-if='ctrl.profile' [profile]='ctrl.profile'></change-password>",
                controller: ProfileConfigurationOptionComponent,
                controllerAs: "ctrl"
            }
        }
    });
}
