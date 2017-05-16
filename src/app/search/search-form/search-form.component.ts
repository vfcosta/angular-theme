import { Component, Inject } from "@angular/core";

@Component({
    selector: 'search-form',
    template: require('app/search/search-form/search-form.html'),
})
export class SearchFormComponent {

    query: string;

    constructor(@Inject("$state") private $state: ng.ui.IStateService) { }

    ngOnInit() {
        this.query = this.$state.params['query'];
    }

    search() {
        this.$state.go('main.environment.search', { query: this.query });
    }
}
