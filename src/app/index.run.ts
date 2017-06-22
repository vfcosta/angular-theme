import { AuthService } from './login/auth.service';
import { Inject } from '@angular/core';

/** @ngInject */

export function noosferoAngularRunBlock(authService: AuthService, editableOptions: angular.xeditable.IEditableOptions) {
    authService.reloadUser();
    editableOptions.theme = 'bs3';
}
