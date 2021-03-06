import { PersonalDataDictionary } from './personal-data-dictionary';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatorService } from './../../../shared/services/translator.service';
import { NotificationService } from './../../../shared/services/notification.service';
import { ProfileService } from './../../../../lib/ng-noosfero-api/http/profile.service';
import { Component, Input, Inject, Output, ViewChild, EventEmitter, ViewEncapsulation, OnInit } from '@angular/core';

/**
 * @ngdoc controller
 * @name ProfilePersonalDataComponent
 * @description
 *  The controller responsible to profile configuration.
 */
@Component({
    selector: "profile-personal-data",
    templateUrl: './profile-personal-data.html',
    styleUrls: ['./profile-personal-data.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProfilePersonalDataComponent implements OnInit {

    @Input() profile: noosfero.Profile;
    @Output() finished = new EventEmitter<noosfero.Profile>();

    @ViewChild('identifierErrors') identifierErrors;

    customFieldsDict: PersonalDataDictionary;

    updatedProfile: noosfero.Profile;

    errors: any;

    constructor(private profileService: ProfileService,
        private notificationService: NotificationService,
        private translatorService: TranslatorService, private router: Router) { }

    ngOnInit() {
        this.cloneProfile();
    }

    save() {
        this.profileService.update(this.updatedProfile).then(() => {
            this.errors = null;
            const identifierChanged = this.profile.identifier !== this.updatedProfile.identifier;
            this.profile = Object.assign(this.profile, this.updatedProfile);
            this.notificationService.success({ title: "profile.edition.success.title", message: "profile.edition.success.message" });
            this.finished.emit(this.profile);
            if (identifierChanged) {
                this.router.navigate(['/', this.profile.identifier]); // go to the state with the new identifier url
            }
        }).catch((response) => {
            this.errors = response.data.error;
            this.notificationService.error({ title: "profile.edition.error.title", message: "profile.edition.error.message" });
            // this.identifierErrors.setErrors(this.errors['identifier']);
        });
    }

    cloneProfile() {
        this.updatedProfile = <noosfero.Profile>['id', 'name', 'email'].reduce((object, key) => {
            object[key] = this.profile[key]; return object;
        }, {});
        // this.updatedProfile = <noosfero.Profile>['id', 'name', 'email', 'additional_data'].reduce((object, key) => {
            // object[key] = this.profile[key]; return object;
        // }, {});
        // this.customFieldsDict = this.updatedProfile.additional_data;
    }

    keys(): Array<string> {
        return Object.keys(this.customFieldsDict);
    }

    translateLabel(label) {
        const translation = this.translatorService.translate('profile.edition.' + label);
        return translation.indexOf('profile.edition.') >= 0 ? label : translation;
    }

    fieldType(label) {
        return label.indexOf('date') >= 0 ? 'date' : 'text';
    }
}
