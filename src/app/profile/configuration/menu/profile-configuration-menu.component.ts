import { Component, Input, Inject } from '@angular/core';

/**
 * @ngdoc controller
 * @name ProfileConfigurationMenuComponent
 * @description
 *  The controller responsible to profile configuration.
 */
@Component({
    selector: "profile-configuration-menu",
    templateUrl: './profile-configuration-menu.html',
    styleUrls: ['./profile-configuration-menu.scss']
})
export class ProfileConfigurationMenuComponent {
    @Input() profile: noosfero.Profile;
}