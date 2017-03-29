import { PersonService } from './../../../../lib/ng-noosfero-api/http/person.service';
import { Component, Input, Inject } from '@angular/core';

@Component({
    selector: "person-friends",
    template: require('app/profile/configuration/friends/person-friends.html'),
})
export class PersonFriendsComponent {

    profile: noosfero.Profile;
    friends: noosfero.Person[];
    private currentPage = 1;
    private perPage = 20;
    private total: number;

    constructor(@Inject('personService') private personService: PersonService) { }

    ngOnInit() {
        this.loadPage({ page: 1 });
    }

    loadPage($event: any) {
        let filters = { per_page: this.perPage, page: $event.page };
        this.personService.getFriends(this.profile.id, filters).then((result: noosfero.RestResult<noosfero.Person[]>) => {
            this.total = <number>result.headers("total");
            this.friends = result.data;
        });
    }
}