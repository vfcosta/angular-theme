import { ThemeService } from './../shared/services/theme.service';
import { EnvironmentService } from '../../lib/ng-noosfero-api/http/environment.service';
import { AuthEvents, AuthService } from '../login';
import { NotificationService } from '../shared/services/notification.service';
import { DesignModeService } from './../shared/services/design-mode.service';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * @ngdoc controller
 * @name environment.Environment
 * @description
 *  This is the environment controller.
 */
@Component({
    selector: 'environment',
    templateUrl: './environment.html',
    styleUrls: ['./environment.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class EnvironmentComponent {

    boxes: noosfero.Box[];
    environment: noosfero.Environment;

    constructor(private environmentService: EnvironmentService, private notificationService: NotificationService,
        private authService: AuthService, private designModeService: DesignModeService,
        private themeService: ThemeService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.environment = this.route.snapshot.data['environment'];
        if (this.themeService.verifyTheme(this.environment.theme)) return;
        this.designModeService.setInDesignMode(false);

        this.authService.subscribe(AuthEvents[AuthEvents.loginSuccess], () => {
            this.environmentService.get('default').then((result: noosfero.RestResult<noosfero.Environment>) => {
                Object.assign(this.environment, result.data);
            });
        });
        this.authService.subscribe(AuthEvents[AuthEvents.logoutSuccess], () => {
            this.environmentService.get('default').then((result: noosfero.RestResult<noosfero.Environment>) => {
                Object.assign(this.environment, result.data);
                this.environment.permissions = undefined;
            });
        });
    }
}
