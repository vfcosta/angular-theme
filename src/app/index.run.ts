import {Session} from "./components/auth/session";

/** @ngInject */
export function noosferoAngularRunBlock($log: ng.ILogService, Restangular: restangular.IService, Session: Session) {
    Restangular.addFullRequestInterceptor((element: any, operation: string, route: string, url: string, headers: string)  => {
        if (Session.getCurrentUser()) {
            (<any>headers)["Private-Token"] = Session.getCurrentUser().private_token;
        }
        return <any>{ headers: <any>headers };
    });
}

