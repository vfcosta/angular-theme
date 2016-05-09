import {NoosferoApp} from "./index.module";
import {noosferoModuleConfig} from "./index.config";
import {noosferoAngularRunBlock} from "./index.run";

import {MainComponent} from "./main/main.component";
import {bootstrap, bundle} from "ng-forward";

import {AuthEvents} from "./login/auth-events";
import {AuthController} from "./login/auth.controller";

import {Navbar} from "./layout/navbar/navbar";

declare var moment: any;

let noosferoApp: any = bundle("noosferoApp", MainComponent, ["ngAnimate", "ngCookies", "ngStorage", "ngTouch",
    "ngSanitize", "ngMessages", "ngAria", "restangular",
    "ui.router", "ui.bootstrap", "toastr", "ngCkeditor",
    "angular-bind-html-compile","angularMoment", "angular.filter", "akoenig.deckgrid",
    "angular-timeline", "duScroll", "oitozero.ngSweetAlert",
    "pascalprecht.translate", "tmh.dynamicLocale", "angularLoad",
    "angular-click-outside"]).publish();

NoosferoApp.angularModule = noosferoApp;


NoosferoApp.addConstants("moment", moment);
NoosferoApp.addConstants("AuthEvents", AuthEvents);

NoosferoApp.addConfig(noosferoModuleConfig);
NoosferoApp.run(noosferoAngularRunBlock);
