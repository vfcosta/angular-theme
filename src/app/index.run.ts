import { AuthService } from './login/auth.service';
import { Inject } from '@angular/core';

/** @ngInject */

export function noosferoAngularRunBlock(authService: AuthService) {
    authService.reloadUser();
}
