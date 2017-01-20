import {SessionService} from "./login";
import {NotificationService} from "./shared/services/notification.service";

/** @ngInject */
export function noosferoAngularRunBlock(
    $log: ng.ILogService,
    Restangular: restangular.IService,
    SessionService: SessionService,
    NotificationService: NotificationService,
    editableOptions: angular.xeditable.IEditableOptions
) {
    Restangular.addFullRequestInterceptor((element: any, operation: string, route: string, url: string, headers: string) => {
        if (SessionService.currentUser()) {
            (<any>headers)["Private-Token"] = SessionService.currentUser().private_token;
        }
        return <any>{ headers: <any>headers };
    });
    SessionService.reloadUser();
    Restangular.setErrorInterceptor((response: restangular.IResponse, deferred: ng.IDeferred<any>) => {
        // return false to break the promise chain and don't call catch
        return !NotificationService.httpError(response.status, response.data);
    });
    editableOptions.theme = 'bs3';
}
