
/** @ngInject */
export function noosferoModuleConfig($logProvider: ng.ILogProvider,
    $locationProvider: ng.ILocationProvider,
    RestangularProvider: restangular.IProvider,
    $httpProvider: ng.IHttpProvider,
    $provide: ng.auto.IProvideService,
    $translateProvider: angular.translate.ITranslateProvider,
    tmhDynamicLocaleProvider: any) {

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
}

function configTranslation($translateProvider: angular.translate.ITranslateProvider, tmhDynamicLocaleProvider: any) {
    $translateProvider.useStaticFilesLoader({
        prefix: '/languages/',
        suffix: '.json'
    });
    $translateProvider.addInterpolation('$translateMessageFormatInterpolation');
    $translateProvider.useMissingTranslationHandlerLog();
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escape');
    tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
    tmhDynamicLocaleProvider.useCookieStorage();
}
