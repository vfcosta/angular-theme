import { Component, Inject, provide } from "ng-forward";
import { EventsHubService } from "../../shared/services/events-hub.service";
import { NoosferoKnownEvents } from "../../known-events";

@Component({
    selector: "theme-header",
    templateUrl: "app/layout/theme-header/theme-header.html",
    providers: [
        provide('eventsHubService', { useClass: EventsHubService })
    ]
})
@Inject(EventsHubService)
export class ThemeHeaderComponent {

    eventsNames: NoosferoKnownEvents;

    constructor(private eventsHubService: EventsHubService) {
        this.eventsNames = new NoosferoKnownEvents();
    }

    openSearch() {
        this.eventsHubService.emitEvent(this.eventsNames.OPEN_SEARCH_FORM, null);
    }

}
