

/** @ngInject */
export function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("main.profile.cms", {
            url: "^/myprofile/:profile/cms",
            views: {
                "mainBlockContent": {
                    templateUrl: "app/cms/cms.html",
                    controller: "CmsController",
                    controllerAs: "vm"
                }
            }
        })
        .state("main.profile.settings", {
            url: "^/myprofile/:profile"
        })
        .state("main.profile.home", {
            url: "",
            views: {
                "mainBlockContent": {
                    controller: "ProfileHomeController",
                    controllerAs: "vm"
                }
            }
        })
        .state("main.profile.info", {
            url: "^/profile/:profile",
            views: {
                "mainBlockContent": {
                    templateUrl: "app/profile-info/profile-info.html",
                    controller: "ProfileInfoController",
                    controllerAs: "vm"
                }
            }
        })
        .state("main.profile.page", {
            url: "/{page:any}",
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
        });

    $urlRouterProvider.otherwise("/");
}
