import { AuthService } from './login/auth.service';
import { Inject } from '@angular/core';
import { TranslatorService } from './shared/services/translator.service';
import { NotificationService } from "./shared/services/notification.service";

/** @ngInject */

export function noosferoAngularRunBlock(
    $log: ng.ILogService,
    AuthService: AuthService,
    NotificationService: NotificationService,
    editableOptions: angular.xeditable.IEditableOptions,
    TranslatorService: TranslatorService

) {
    AuthService.reloadUser();
    editableOptions.theme = 'bs3';
}
