import { PersonService } from './../../../../lib/ng-noosfero-api/http/person.service';
import { Component, Input, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: "person-communities",
    template: require('app/profile/configuration/communities/person-communities.html'),
})
export class PersonCommunitiesComponent {

    @Input() profile: noosfero.Profile;
    communities: noosfero.Community[];
    search: string;
    private currentPage = 1;
    private perPage = 20;
    private total: number;
    searchChanged: Subject<string> = new Subject<string>();
    private style: string;

    constructor(@Inject('personService') private personService: PersonService,
                @Inject('$stateParams') $stateParams: ng.ui.IStateParamsService) {

        this.search = $stateParams['search'];
        this.searchChanged.debounceTime(300).subscribe((search: string) => {
            this.search = search;
            this.loadPage({page: this.currentPage});
        });
        this.style = 'card';
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
            this.total = <number>result.headers("total");
            this.communities = result.data;
        });
    }

    searchCommunities() {
        this.loadPage({page: this.currentPage});
    }

    getStyle() {
        return this.style;
    }

}