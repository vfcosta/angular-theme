import {Component, Inject} from "ng-forward";

@Component({
    selector: 'search-form',
    templateUrl: 'app/search/search-form/search-form.html'
})
@Inject("$state")
export class SearchFormComponent {

    query: string;

    constructor(private $state: ng.ui.IStateService) { }

    search() {
        this.$state.go('main.environment.search', { query: this.query });
    }
}
