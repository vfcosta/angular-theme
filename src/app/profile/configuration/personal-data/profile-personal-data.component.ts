import { TranslatorService } from './../../../shared/services/translator.service';
import { NotificationService } from './../../../shared/services/notification.service';
import { ProfileService } from './../../../../lib/ng-noosfero-api/http/profile.service';
import { Component, Input, Inject, Output, ViewChild, EventEmitter } from '@angular/core';

/**
 * @ngdoc controller
 * @name ProfilePersonalDataComponent
 * @description
 *  The controller responsible to profile configuration.
 */
@Component({
    selector: "profile-personal-data",
    template: require('app/profile/configuration/personal-data/profile-personal-data.html')
})
export class ProfilePersonalDataComponent {

    @Input() profile: noosfero.Profile;
    @Output() finished = new EventEmitter<noosfero.Profile>();

    @ViewChild('identifierErrors') identifierErrors;

    customFieldsDict: Dictionary;

    updatedProfile: noosfero.Profile;

    errors: any;

    constructor( @Inject("profileService") private profileService: ProfileService,
        @Inject("notificationService") private notificationService: NotificationService,
        @Inject("$state") private $state: ng.ui.IStateService,
        @Inject("translatorService") private translatorService: TranslatorService) { }

    ngOnInit() {
        this.cloneProfile();
    }

    save() {
        this.profileService.update(this.updatedProfile).then(() => {
            this.errors = null;
            let identifierChanged = this.profile.identifier !== this.updatedProfile.identifier;
            this.profile = Object.assign(this.profile, this.updatedProfile);
            this.notificationService.success({ title: "profile.edition.success.title", message: "profile.edition.success.message" });
            this.finished.emit(this.profile);
            if (identifierChanged) {
                // go to the state with the new identifier url
                this.$state.go(this.$state.current, { profile: this.profile.identifier }, { reload: true });
            }
        }).catch((response) => {
            this.errors = response.data.error;
            this.notificationService.error({ title: "profile.edition.error.title", message: "profile.edition.error.message" });
            // this.identifierErrors.setErrors(this.errors['identifier']);
        });
    }

    cancel() {
        this.finished.emit(this.profile);
    }

    cloneProfile() {
        this.updatedProfile = <noosfero.Profile>['id', 'name', 'email'].reduce((object, key) => {
            object[key] = this.profile[key]; return object;
        }, {});
        //this.updatedProfile = <noosfero.Profile>['id', 'name', 'email', 'additional_data'].reduce((object, key) => {
            //object[key] = this.profile[key]; return object;
        //}, {});
        //this.customFieldsDict = this.updatedProfile.additional_data;
    }

    keys(): Array<string> {
        return Object.keys(this.customFieldsDict);
    }

    translateLabel(label) {
        let translation = this.translatorService.translate('profile.edition.' + label);
        return translation.indexOf('profile.edition.') >= 0 ? label : translation;
    }

    fieldType(label) {
        return label.indexOf('date') >= 0 ? 'date' : 'text';
    }
}

interface Dictionary {
    [index: string]: string;
}