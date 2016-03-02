

/** @ngInject */
export function routeConfig($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
    $stateProvider
        .state("main.profile.settings", {
            url: "^/myprofile/:profile"
        });

    $urlRouterProvider.otherwise("/");
}
