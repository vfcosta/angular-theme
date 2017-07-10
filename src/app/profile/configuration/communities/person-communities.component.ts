import { ActivatedRoute } from '@angular/router';
import { PersonService } from './../../../../lib/ng-noosfero-api/http/person.service';
import { Component, Input, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DisplayStyles } from '../../profile-list/profile-list.component';

@Component({
    selector: "person-communities",
    template: require('app/profile/configuration/communities/person-communities.html'),
})
export class PersonCommunitiesComponent {

    profile: noosfero.Profile;
    communities: noosfero.Community[];
    search: string;
    private currentPage = 1;
    private perPage = 20;
    private total: number;
    searchChanged: Subject<string> = new Subject<string>();
    private displayStyle: string = DisplayStyles.card;

    constructor(private personService: PersonService, route: ActivatedRoute) {
        this.search = route.snapshot.queryParams['search'];
        this.profile = route.parent.snapshot.data["profile"];
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
        this.personService.getCommunities(this.profile.id, filters).then((result: noosfero.RestResult<noosfero.Community[]>) => {
            this.total = <number>result.headers.get("total");
            this.communities = result.data;
        });
    }

    searchCommunities() {
        this.loadPage({page: this.currentPage});
    }

    getDisplayStyle() {
        return this.displayStyle;
    }

}