import 'reflect-metadata';
import {NoosferoApp} from "./index.module";
import {noosferoModuleConfig} from "./index.config";
import {noosferoAngularRunBlock} from "./index.run";
import {routeConfig} from "./index.route";
import {ContentViewerController} from "./content-viewer/content-viewer.controller";
import {Main} from "./main/main.controller";
import {bootstrap, bundle} from 'ng-forward';

declare var moment: any;

let noosferoApp: any = bundle("noosferoApp", Main, ["ngAnimate", "ngCookies", "ngStorage", "ngTouch",
    "ngSanitize", "ngMessages", "ngAria", "restangular",
    "ui.router", "ui.bootstrap", "toastr",
    "angularMoment", "angular.filter", "akoenig.deckgrid",
    "angular-timeline", "duScroll", "oitozero.ngSweetAlert"]).publish();
console.log(noosferoApp);
// bootstrap(Main, noosferoApp.requires);

NoosferoApp.angularModule = noosferoApp;
// 
NoosferoApp.addConstants("moment", moment);
NoosferoApp.addConstants("AUTH_EVENTS", {
    loginSuccess: "auth-login-success",
    loginFailed: "auth-login-failed",
    logoutSuccess: "auth-logout-success"
});
// 
// 
NoosferoApp.addConfig(noosferoModuleConfig);
// 
NoosferoApp.run(noosferoAngularRunBlock);

noosferoApp.run(() => {
    console.log("RUN!");
});

// // require("./main/main.controller.js");
// require("./cms/cms.controller.js");
// require("./components/auth/auth.controller.js");
// require("./components/auth/auth.service.js");
// require("./components/navbar/navbar.directive.js");
// require("./components/noosfero-activities/activities.component.js");
// require("./components/noosfero-activities/activity/activity.component.js");
// require("./components/noosfero-articles/blog/blog.component.js");
// require("./components/noosfero-blocks/block.directive.js");
// require("./components/noosfero-blocks/link-list/link-list.component.js");
// require("./components/noosfero-blocks/main-block/main-block.component.js");
// require("./components/noosfero-blocks/members-block/members-block.component.js");
// require("./components/noosfero-blocks/profile-image/profile-image.component.js");
// require("./components/noosfero-blocks/recent-documents/recent-documents.component.js");
// require("./components/noosfero-boxes/boxes.component.js");
// require("./components/noosfero/noosfero-template.filter.js");
// require("./components/noosfero/noosfero.service.js");
// require("./components/noosfero/profile-image/profile-image.component.js");
// require("./content-viewer/content-viewer-actions.controller.js");
// // require("./content-viewer/content-viewer.controller.js");
// require("./profile-info/profile-info.controller.js");
// require("./profile/profile-home.controller.js");
// require("./profile/profile.controller.js");

// NoosferoApp.addController("ContentViewerController", ContentViewerController);

// NoosferoApp.addConfig(routeConfig);



//bootstrap(Main, ['ui.router']);