import { PersonService } from './../../../../lib/ng-noosfero-api/http/person.service';
import { Component, Input, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: "person-friends",
    template: require('app/profile/configuration/friends/person-friends.html'),
})
export class PersonFriendsComponent {

    @Input() profile: noosfero.Profile;
    friends: noosfero.Person[];
    search: string;
    private currentPage = 1;
    private perPage = 20;
    private total: number;
    searchChanged: Subject<string> = new Subject<string>();

    constructor(@Inject('personService') private personService: PersonService,
                @Inject('$stateParams') $stateParams: ng.ui.IStateParamsService) {

        this.search = $stateParams['search'];
        this.searchChanged.debounceTime(300).subscribe((search: string) => {
            this.search = search;
            this.loadPage({page: this.currentPage});
        });
    }

    ngOnInit() {
        this.loadPage({ page: 1 });
    }

    loadPage($event: any) {
        let filters = { 
            per_page: this.perPage, 
            page: $event.page, 
            search: this.search,
            order: 'name ASC'
        };
        this.personService.getFriends(this.profile.id, filters).then((result: noosfero.RestResult<noosfero.Person[]>) => {
            this.total = <number>result.headers("total");
            this.friends = result.data;
        });
    }

    searchFriends() {
        this.loadPage({page: this.currentPage});
    }

}