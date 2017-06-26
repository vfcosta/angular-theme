
/** @ngInject */
export function noosferoModuleConfig(
    $locationProvider: ng.ILocationProvider,
    $httpProvider: ng.IHttpProvider,
    $provide: ng.auto.IProvideService,
    $urlMatcherFactoryProvider: angular.ui.IUrlMatcherFactory,
    $urlRouterProvider: angular.ui.IUrlRouterProvider) {

    $locationProvider.html5Mode({ enabled: true });

    (<any>$httpProvider.defaults.headers.post)["Content-Type"] = "application/x-www-form-urlencoded; charset=utf-8";


    $provide.decorator("$uiViewScroll", function($delegate: any, $document: any) {
        return function(uiViewElement: any) {
            $document.scrollToElementAnimated(uiViewElement);
        };
    });

    $urlMatcherFactoryProvider.strictMode(false);

    // Remove trailing slash from url
    $urlRouterProvider.rule(($injector: any, $location: any) => {
        let path = $location.path();
        let hasTrailingSlash = path[path.length - 1] === '/';
        if (hasTrailingSlash) {
            let newPath = path.substr(0, path.length - 1);
            return newPath;
        }
    });
}
