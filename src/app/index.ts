import {NoosferoApp} from "./index.module";
import {noosferoModuleConfig} from "./index.config";
import {noosferoAngularRunBlock} from "./index.run";
import {routeConfig} from "./index.route";

import {Main} from "./main/main.component";
import {bootstrap, bundle} from "ng-forward";

import {AUTH_EVENTS} from "./components/auth/auth_events";
import {AuthController} from "./components/auth/auth_controller";

import {Navbar} from "./components/navbar/navbar";

declare var moment: any;

let noosferoApp: any = bundle("noosferoApp", Main, ["ngAnimate", "ngCookies", "ngStorage", "ngTouch",
    "ngSanitize", "ngMessages", "ngAria", "restangular",
    "ui.router", "ui.bootstrap", "toastr",
    "angularMoment", "angular.filter", "akoenig.deckgrid",
    "angular-timeline", "duScroll", "oitozero.ngSweetAlert"]).publish();

NoosferoApp.angularModule = noosferoApp;


NoosferoApp.addConstants("moment", moment);
NoosferoApp.addConstants("AUTH_EVENTS", AUTH_EVENTS);

NoosferoApp.addConfig(noosferoModuleConfig);
NoosferoApp.run(noosferoAngularRunBlock);

// NoosferoApp.addService("Session", Session);
// NoosferoApp.addService("AuthService", AuthService);
NoosferoApp.addController("AuthController", AuthController);

require("./components/noosfero/noosfero.service.js");
require("./components/noosfero/profile-image/profile-image.component.js");

NoosferoApp.addConfig(routeConfig);
