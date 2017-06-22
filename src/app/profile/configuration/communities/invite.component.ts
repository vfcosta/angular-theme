import { Component, Inject, Input, NgZone } from '@angular/core';
import { PersonService } from "../../../../lib/ng-noosfero-api/http/person.service";
import { CommunityService } from "../../../../lib/ng-noosfero-api/http/community.service";
import { ProfileService } from "../../../../lib/ng-noosfero-api/http/profile.service";
import { TranslatorService } from "../../../shared/services/translator.service";
import { NotificationService } from '../../../shared/services/notification.service';

import { Observable } from 'rxjs/Observable';


@Component({
    selector: "noosfero-invite-component",
    template: require('app/profile/configuration/communities/invite.html')
})
export class InviteComponent {

    @Input() profile;

    public peopleToInvite: noosfero.Person[];
    public listOfPeople: any[];
    public searchToken: string;

    constructor(private personService: PersonService,
        private communityService: CommunityService,
        private profileService: ProfileService,
        private translatorService: TranslatorService,
        public notificationService: NotificationService,
        private zone: NgZone) {
        this.peopleToInvite = [];
        this.listOfPeople = Observable.create((observer: any) => {
            observer.next(this.searchToken);
        }).mergeMap((token: string) => this.searchPerson(token));
    }

    ngOnInit() {
        this.profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
            this.profile = profile;
        })
    }

    sendInvitations() {
        this.communityService.sendInvitations(this.profile.id, this.peopleToInvite).subscribe((response: noosfero.DefaultResponse) => {
            if (response.success) {
                this.zone.run(() => {
                    this.peopleToInvite = [];
                    this.searchToken = null;
                    this.notificationService.success({ title: "invite.send.success.title", message: "invite.send.success.message" });
                });
            }
        }, error => {
            this.notificationService.error({ title: "invite.send.error.title", message: "invite.send.error.message" });
            console.log(error)
        });
    }

    markToInvite(person) {
        this.zone.run(() => {
            if (person && person.id) {
                if (this.peopleToInvite.filter(e => e.id == person.id).length === 0) {
                    this.peopleToInvite.push(person);
                }
            }
            this.searchToken = null;
        });
    }

    unmarkToInvite(person) {
        this.peopleToInvite.splice(this.peopleToInvite.indexOf(person), 1);
    }

    searchPerson(key: any) {
        let filters = { search: key, per_page: 10 };
        return this.personService.search(filters).map(data => {
            if (data.length == 0) {
                return [{ name: this.translatorService.translate("profile.members.invitations.none") }];
            } else {
                return data;
            }
        });
    }

}
