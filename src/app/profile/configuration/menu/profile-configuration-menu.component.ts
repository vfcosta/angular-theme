import { TranslatePipe } from './../../../shared/pipes/translate-pipe';
import {Component, Input} from '@angular/core';

/**
 * @ngdoc controller
 * @name NoosferoActivities
 * @description
 *  The controller responsible to profile configuration.
 */
@Component({
    selector: "profile-configuration-menu",
    template: require('app/profile/configuration/menu/profile-configuration-menu.html'),
})
export class ProfileConfigurationMenuComponent {
    @Input() profile: noosfero.Profile;
}