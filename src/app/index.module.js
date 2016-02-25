"use strict";
var NoosferoApp = (function () {
    function NoosferoApp() {
    }
    NoosferoApp.init = function () {
        angular.module(NoosferoApp.appName, ["ngAnimate", "ngCookies", "ngStorage", "ngTouch",
            "ngSanitize", "ngMessages", "ngAria", "restangular",
            "ui.router", "ui.bootstrap", "toastr",
            "angularMoment", "angular.filter", "akoenig.deckgrid",
            "angular-timeline", "duScroll", "oitozero.ngSweetAlert"]);
    };
    NoosferoApp.addConfig = function (configFunc) {
        angular.module(NoosferoApp.appName).config(configFunc);
    };
    NoosferoApp.addConstants = function (constantName, value) {
        angular.module(NoosferoApp.appName).constant(constantName, value);
    };
    NoosferoApp.addService = function (serviceName, value) {
        angular.module(NoosferoApp.appName).service(serviceName, value);
    };
    NoosferoApp.run = function (runFunction) {
        angular.module(NoosferoApp.appName).run(runFunction);
    };
    NoosferoApp.appName = "noosferoApp";
    return NoosferoApp;
}());
exports.NoosferoApp = NoosferoApp;
