import { Inject } from '@angular/core';
import { TranslatorService } from './shared/services/translator.service';
import { SessionService } from "./login";
import { NotificationService } from "./shared/services/notification.service";

/** @ngInject */

export function noosferoAngularRunBlock(
    $log: ng.ILogService,
    Restangular: restangular.IService,
    SessionService: SessionService,
    NotificationService: NotificationService,
    editableOptions: angular.xeditable.IEditableOptions,
    TranslatorService: TranslatorService

) {
    Restangular.addFullRequestInterceptor((element: any, operation: string, route: string, url: string, headers: string) => {
        if (SessionService.currentUser()) {
            (<any>headers)["Private-Token"] = SessionService.currentUser().private_token;
        }
        (<any>headers)["Accept-Language"] = TranslatorService.currentLanguage();
        return <any>{ headers: <any>headers };
    });
    SessionService.reloadUser();
    Restangular.setErrorInterceptor((response: restangular.IResponse, deferred: ng.IDeferred<any>) => {
        NotificationService.httpError(response.status, response.data);
        return true; // return true to continue the promise chain and call catch
    });
    editableOptions.theme = 'bs3';
}
