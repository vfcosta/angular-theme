import {Session} from "./components/auth/session";

/** @ngInject */
export function noosferoAngularRunBlock($log: ng.ILogService, Restangular: restangular.IService, Session: Session) {
    Restangular.addFullRequestInterceptor((element: any, operation: string, route: string, url: string, headers: string)  => {
        if (Session.currentUser()) {
            (<any>headers)["Private-Token"] = Session.currentUser().private_token;
        }
        return <any>{ headers: <any>headers };
    });
}

