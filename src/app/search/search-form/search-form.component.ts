import { Component, Inject } from "ng-forward";

@Component({
    selector: 'search-form',
    templateUrl: 'app/search/search-form/search-form.html'
})
@Inject("$state")
export class SearchFormComponent {

    query: string;
    showSearch = false;

    constructor(private $state: ng.ui.IStateService) {
    }

    ngOnInit() {
        this.query = this.$state.params['query'];
    }

    search() {
        this.$state.go('main.environment.search', { query: this.query });
    }

    isSearchPage() {
        return "main.environment.search" === this.$state.current.name;
    }
}
