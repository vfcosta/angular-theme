
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



declare var moment: any;

let noosferoApp: any = bundle("noosferoApp", Main, ["ngAnimate", "ngCookies", "ngStorage", "ngTouch",
    "ngSanitize", "ngMessages", "ngAria", "restangular",
    "ui.router", "ui.bootstrap", "toastr",
    "angularMoment", "angular.filter", "akoenig.deckgrid",
    "angular-timeline", "duScroll", "oitozero.ngSweetAlert"]).publish();

NoosferoApp.angularModule = noosferoApp;

NoosferoApp.addConstants("moment", moment);
NoosferoApp.addConstants("AUTH_EVENTS", {
    loginSuccess: "auth-login-success",
    loginFailed: "auth-login-failed",
    logoutSuccess: "auth-logout-success"
});

NoosferoApp.addConfig(noosferoModuleConfig);
NoosferoApp.run(noosferoAngularRunBlock);

require("./components/auth/auth.controller.js");
require("./components/auth/auth.service.js");
require("./components/navbar/navbar.directive.js");
require("./components/noosfero-activities/activities.component.js");
require("./components/noosfero-activities/activity/activity.component.js");
require("./components/noosfero-blocks/link-list/link-list.component.js");
require("./components/noosfero-blocks/main-block/main-block.component.js");
require("./components/noosfero-blocks/members-block/members-block.component.js");
require("./components/noosfero-blocks/profile-image/profile-image.component.js");
require("./components/noosfero-blocks/recent-documents/recent-documents.component.js");
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
