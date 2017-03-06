
/** @ngInject */
export function noosferoModuleConfig($logProvider: ng.ILogProvider,
    $locationProvider: ng.ILocationProvider,
    RestangularProvider: restangular.IProvider,
    $httpProvider: ng.IHttpProvider,
    $provide: ng.auto.IProvideService,
    $translateProvider: angular.translate.ITranslateProvider,
    tmhDynamicLocaleProvider: any,
    $urlMatcherFactoryProvider: angular.ui.IUrlMatcherFactory,
    $urlRouterProvider: angular.ui.IUrlRouterProvider) {

    $logProvider.debugEnabled(true);
    $locationProvider.html5Mode({ enabled: true });
    RestangularProvider.setBaseUrl("/api/v1");
    RestangularProvider.setFullResponse(true);

    (<any>$httpProvider.defaults.headers.post)["Content-Type"] = "application/x-www-form-urlencoded; charset=utf-8";


    $provide.decorator("$uiViewScroll", function($delegate: any, $document: any) {
        return function(uiViewElement: any) {
            $document.scrollToElementAnimated(uiViewElement);
        };
    });
    configTranslation($translateProvider, tmhDynamicLocaleProvider);

    $urlMatcherFactoryProvider.strictMode(false);

    // Remove trailing slash from url
    $urlRouterProvider.rule(($injector, $location) => {
        let path = $location.path();
        let hasTrailingSlash = path[path.length - 1] === '/';
        if (hasTrailingSlash) {
            let newPath = path.substr(0, path.length - 1);
            return newPath;
        }
    });
}

function configTranslation($translateProvider: angular.translate.ITranslateProvider, tmhDynamicLocaleProvider: any) {
    let defaultLanguage = (<any>navigator)['languages'] ? (<any>navigator)['languages'][0] : (navigator.language || (<any>navigator)['userLanguage']);
    defaultLanguage = defaultLanguage && (<any>navigator)['userAgent'].indexOf('PhantomJS') === -1 ? defaultLanguage.replace(/-br|-us/i, '') : 'en';

    $translateProvider.useStaticFilesLoader({
        prefix: '/languages/',
        suffix: '.json'
    });
    $translateProvider.addInterpolation('$translateMessageFormatInterpolation');
    $translateProvider.useMissingTranslationHandlerLog();
    $translateProvider.preferredLanguage(defaultLanguage);
    $translateProvider.useSanitizeValueStrategy('escape');
    tmhDynamicLocaleProvider.defaultLocale(defaultLanguage);
    tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
    tmhDynamicLocaleProvider.useCookieStorage();
}
