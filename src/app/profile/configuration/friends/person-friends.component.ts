import { ActivatedRoute } from '@angular/router';
import { PersonService } from './../../../../lib/ng-noosfero-api/http/person.service';
import { Component, Input, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DisplayStyles } from '../../profile-list/profile-list.component';

@Component({
    selector: "person-friends",
    templateUrl: './person-friends.html',
    styleUrls: ['./person-friends.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class PersonFriendsComponent implements OnInit {

    profile: noosfero.Profile;
    friends: noosfero.Person[];
    search: string;
    private currentPage = 1;
    private perPage = 20;
    private total: number;
    searchChanged: Subject<string> = new Subject<string>();
    private displayStyle: string = DisplayStyles.card;

    constructor(private personService: PersonService, route: ActivatedRoute) {
        this.search = route.snapshot.queryParams['search'];
        this.searchChanged.debounceTime(300).subscribe((search: string) => {
            this.search = search;
            this.loadPage({ page: this.currentPage });
        });
        this.profile = route.parent.snapshot.data['profile'];
    }

    ngOnInit() {
        this.loadPage({ page: 1 });
    }

    loadPage($event: any) {
        const filters = {
            per_page: this.perPage,
            page: $event.page,
            search: this.search,
            order: 'name ASC'
        };
        this.personService.getFriends(this.profile.id, filters).then((result: noosfero.RestResult<noosfero.Person[]>) => {
            this.total = <number>result.headers.get("total");
            this.friends = result.data;
        });
    }

    searchFriends() {
        this.loadPage({ page: this.currentPage });
    }

    getDisplayStyle() {
        return this.displayStyle;
    }

}
