import { Router } from '@angular/router';
import { ValidationMessageComponent } from './../../shared/components/validation-message/validation-message.component';
import { NotificationService } from './../../shared/services/notification.service';
import { ProfileService } from './../../../lib/ng-noosfero-api/http/profile.service';
import { Component, Inject, Input, Output, EventEmitter, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    selector: "profile-fast-edition",
    templateUrl: './profile-fast-edition.html',
    styleUrls: ['./profile-fast-edition.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProfileFastEditionComponent implements OnInit {

    @Input() profile: noosfero.Profile;
    @Input() environment: noosfero.Environment;
    @Output() finished = new EventEmitter<noosfero.Profile>();

    @ViewChild('identifierErrors') identifierErrors: ValidationMessageComponent;
    @ViewChild('nameErrors') nameErrors: ValidationMessageComponent;

    updatedProfile: noosfero.Profile;

    errors: any;

    constructor(private profileService: ProfileService, private notificationService: NotificationService, private router: Router) { }

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
            if (this.allowChangeIdentifier() && identifierChanged) {
                this.router.navigate(['/', this.profile.identifier]); // go to the state with the new identifier url
            }
        }).catch((response) => {
            this.errors = response.data;
            this.identifierErrors.setBackendErrors(this.errors);
            this.nameErrors.setBackendErrors(this.errors);
        });
    }

    cancel() {
        this.finished.emit(this.profile);
    }

    cloneProfile() {
        const fields = ['id', 'name'];
        if (this.allowChangeIdentifier()) {
            fields.push('identifier');
        }
        this.updatedProfile = <noosfero.Profile>fields.reduce((object, key) => {
            object[key] = this.profile[key]; return object;
        }, {});
    }

    getProfileLink() {
        if (!this.environment || !this.environment.host || !this.profile) return null;
        const host = this.environment.host.replace(/https?:\/\//, "");
        return `${host}/${this.updatedProfile.identifier}`;
    }

    identifierChanged() {
        return this.updatedProfile.identifier !== this.profile.identifier;
    }

    allowChangeIdentifier() {
        if (!this.environment || !this.environment.settings) return false;
        return this.environment.settings['enable_profile_url_change_enabled'];
    }
}
