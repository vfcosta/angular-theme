"use strict";
/** @ngInject */
function noosferoAngularRunBlock($log, Restangular, Session) {
    Restangular.addFullRequestInterceptor(function (element, operation, route, url, headers) {
        if (Session.getCurrentUser()) {
            headers["Private-Token"] = Session.getCurrentUser().private_token;
        }
        return { headers: headers };
    });
}
exports.noosferoAngularRunBlock = noosferoAngularRunBlock;
