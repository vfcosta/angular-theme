export class NoosferoApp {

    static appName: string = "noosferoApp";
    static angularModule: any;
    // static init(angularModule: any) {
    // NoosferoApp.angularModule
    // angular.module(NoosferoApp.appName, ["ngAnimate", "ngCookies", "ngStorage", "ngTouch",
    //     "ngSanitize", "ngMessages", "ngAria", "restangular",
    //     "ui.router", "ui.bootstrap", "toastr",
    //     "angularMoment", "angular.filter", "akoenig.deckgrid",
    //     "angular-timeline", "duScroll", "oitozero.ngSweetAlert"]);
    // }

    static addConfig(configFunc: Function) {
        NoosferoApp.angularModule.config(configFunc);
    }

    static addConstants(constantName: string, value: any) {
        NoosferoApp.angularModule.constant(constantName, value);
    }

    static addService(serviceName: string, value: any) {
        NoosferoApp.angularModule.service(serviceName, value);
    }

    static addFactory(factoryName: string, value: any) {
        NoosferoApp.angularModule.factory(factoryName, value);
    }

    static addController(controllerName: string, value: any) {
        NoosferoApp.angularModule.controller(controllerName, value);
    }

    static run(runFunction: Function) {
        NoosferoApp.angularModule.run(runFunction);
    }
}
