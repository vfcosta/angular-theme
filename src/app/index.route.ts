

/** @ngInject */
export function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("main.profile.settings", {
            url: "^/myprofile/:profile"
        });

    $urlRouterProvider.otherwise("/");
}
