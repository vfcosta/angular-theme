import {Main} from "./main/main.controller";

export class NoosferoApp {

    static appName: string = (<any>Main).name;

    static init() {
        angular.module(NoosferoApp.appName, ["ngAnimate", "ngCookies", "ngStorage", "ngTouch",
            "ngSanitize", "ngMessages", "ngAria", "restangular",
            "ui.router", "ui.bootstrap", "toastr",
            "angularMoment", "angular.filter", "akoenig.deckgrid",
            "angular-timeline", "duScroll", "oitozero.ngSweetAlert"]);
    }

    static addConfig(configFunc: Function) {
        angular.module(NoosferoApp.appName).config(configFunc);
    }

    static addConstants(constantName: string, value: any) {
        angular.module(NoosferoApp.appName).constant(constantName, value);
    }

    static addService(serviceName: string, value: any) {
        angular.module(NoosferoApp.appName).service(serviceName, value);
    }

    static addController(controllerName: string, value: any) {
        angular.module(NoosferoApp.appName).controller(controllerName, value);
    }

    static run(runFunction: Function) {
        angular.module(NoosferoApp.appName).run(runFunction);
    }
}
