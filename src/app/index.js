"use strict";
var index_module_1 = require("./index.module");
var index_config_1 = require("./index.config");
var index_run_1 = require("./index.run");
var index_route_1 = require("./index.route");
index_module_1.NoosferoApp.init();
index_module_1.NoosferoApp.addConstants("moment", moment);
index_module_1.NoosferoApp.addConstants("AUTH_EVENTS", {
    loginSuccess: "auth-login-success",
    loginFailed: "auth-login-failed",
    logoutSuccess: "auth-logout-success"
});
index_module_1.NoosferoApp.addConfig(index_config_1.noosferoModuleConfig);
index_module_1.NoosferoApp.run(index_run_1.noosferoAngularRunBlock);
require("./cms/cms.controller.js");
require("./components/auth/auth.controller.js");
require("./components/auth/auth.service.js");
require("./components/navbar/navbar.directive.js");
require("./components/noosfero-activities/activities.component.js");
require("./components/noosfero-activities/activity/activity.component.js");
require("./components/noosfero-articles/article/article.directive.js");
require("./components/noosfero-articles/blog/blog.component.js");
require("./components/noosfero-blocks/block.directive.js");
require("./components/noosfero-blocks/link-list/link-list.component.js");
require("./components/noosfero-blocks/main-block/main-block.component.js");
require("./components/noosfero-blocks/members-block/members-block.component.js");
require("./components/noosfero-blocks/profile-image/profile-image.component.js");
require("./components/noosfero-blocks/recent-documents/recent-documents.component.js");
require("./components/noosfero-boxes/boxes.component.js");
require("./components/noosfero/noosfero-template.filter.js");
require("./components/noosfero/noosfero.service.js");
require("./components/noosfero/profile-image/profile-image.component.js");
require("./content-viewer/content-viewer-actions.controller.js");
require("./content-viewer/content-viewer.controller.js");
require("./main/main.controller.js");
require("./profile-info/profile-info.controller.js");
require("./profile/profile-home.controller.js");
require("./profile/profile.controller.js");
index_module_1.NoosferoApp.addConfig(index_route_1.routeConfig);
