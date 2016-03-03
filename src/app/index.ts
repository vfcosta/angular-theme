
import "core-js/shim";
import "reflect-metadata";
import {NoosferoApp} from "./index.module";
import {noosferoModuleConfig} from "./index.config";
import {noosferoAngularRunBlock} from "./index.run";
import {routeConfig} from "./index.route";

import {ContentViewer as noosferoContentViewer} from "./content-viewer/content-viewer.component";
import {ContentViewerActions as noosferoContentViewerActions} from "./content-viewer/content-viewer-actions.component";
import {Profile as noosferoProfile} from "./profile/profile.component";
import {ProfileInfo as noosferoProfileInfo} from "./profile-info/profile-info.component";
import {ProfileHome as noosferoProfileHome} from "./profile/profile-home.component";
import {Cms as noosferoCms} from "./cms/cms.component";

import {Main} from "./main/main.component";
import {bootstrap, bundle} from "ng-forward";

import {AUTH_EVENTS} from "./components/auth/auth_events";
import {AuthController} from "./components/auth/auth_controller";

import {Navbar} from "./components/navbar";

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


require("./components/noosfero-activities/activities.component.js");
require("./components/noosfero-activities/activity/activity.component.js");
require("./components/noosfero/noosfero-template.filter.js");
require("./components/noosfero/noosfero.service.js");
require("./components/noosfero/profile-image/profile-image.component.js");

NoosferoApp.addController("ContentViewerController", noosferoContentViewer);
NoosferoApp.addController("ContentViewerActionsController", noosferoContentViewerActions);
NoosferoApp.addController("ProfileController", noosferoProfile);
NoosferoApp.addController("ProfileHomeController", noosferoProfileHome);
NoosferoApp.addController("ProfileInfoController", noosferoProfileInfo);
NoosferoApp.addController("CmsController", noosferoCms);

NoosferoApp.addConfig(routeConfig);
