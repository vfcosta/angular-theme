import { AuthService } from './login/auth.service';
import { Inject } from '@angular/core';
import { NotificationService } from "./shared/services/notification.service";

/** @ngInject */

export function noosferoAngularRunBlock(
    $log: ng.ILogService,
    authService: AuthService,
    NotificationService: NotificationService,
    editableOptions: angular.xeditable.IEditableOptions) {

    authService.reloadUser();
    editableOptions.theme = 'bs3';
}
