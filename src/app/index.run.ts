import {Session} from "./components/auth/session";
import {Notification} from "./components/notification/notification.component";

/** @ngInject */
export function noosferoAngularRunBlock(
    $log: ng.ILogService,
    Restangular: restangular.IService,
    Session: Session,
    Notification: Notification
) {

    Restangular.addFullRequestInterceptor((element: any, operation: string, route: string, url: string, headers: string) => {
        if (Session.currentUser()) {
            (<any>headers)["Private-Token"] = Session.currentUser().private_token;
        }
        return <any>{ headers: <any>headers };
    });
    Restangular.setErrorInterceptor((response: restangular.IResponse, deferred: ng.IDeferred<any>) => {
        // return false to break the promise chain and don't call catch
        return !Notification.httpError(response.status, response.data);
    });
}
