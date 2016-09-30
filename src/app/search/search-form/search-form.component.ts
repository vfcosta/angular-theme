import { Component, Inject, provide } from "ng-forward";
import { EventsHubService } from "../../shared/services/events-hub.service";
import { NoosferoKnownEvents } from "../../known-events";

@Component({
    selector: 'search-form',
    templateUrl: 'app/search/search-form/search-form.html',
    providers: [
        provide('eventsHubService', { useClass: EventsHubService })
    ]
})
@Inject("$state", "$scope", EventsHubService)
export class SearchFormComponent {

    query: string;
    showSearch = false;
    eventsNames: NoosferoKnownEvents;

    constructor(private $state: ng.ui.IStateService,
        private $scope: ng.IScope,
        private eventsHubService: EventsHubService) {
        this.eventsNames = new NoosferoKnownEvents();
    }

    ngOnInit() {
        this.query = this.$state.params['query'];
        this.eventsHubService.subscribeToEvent(this.eventsNames.OPEN_SEARCH_FORM, () => {
            this.showSearch = true;
            this.$scope.$apply();
        });
    }

    search() {
        this.$state.go('main.environment.search', { query: this.query });
    }

    isSearchPage() {
        return "main.environment.search" === this.$state.current.name;
    }
}
