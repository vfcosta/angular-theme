"use strict";
/** @ngInject */
function noosferoModuleConfig($logProvider, $locationProvider, RestangularProvider, $httpProvider, $provide) {
    $logProvider.debugEnabled(true);
    $locationProvider.html5Mode({ enabled: true });
    RestangularProvider.setBaseUrl("/api/v1");
    RestangularProvider.setFullResponse(true);
    $httpProvider.defaults.headers.post = { "Content-Type": "application/x-www-form-urlencoded; charset=utf-8" };
    $provide.decorator("$uiViewScroll", function ($delegate, $document) {
        return function (uiViewElement) {
            $document.scrollToElementAnimated(uiViewElement);
        };
    });
}
exports.noosferoModuleConfig = noosferoModuleConfig;
