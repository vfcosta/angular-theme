import { Component, Inject, provide } from "ng-forward";
import { EventsHubService } from "../../../../../src/app/shared/services/events-hub.service";
import { NoosferoKnownEvents } from "../../../../../src/app/known-events";

@Component({
    selector: "theme-header",
    templateUrl: "app/layout/theme-header/theme-header.html",
    providers: [
        provide('eventsHubService', { useClass: EventsHubService })
    ]
})
@Inject(EventsHubService, "angularLoad")
export class ThemeHeaderComponent {

    eventsNames: NoosferoKnownEvents;

    constructor(private eventsHubService: EventsHubService, private angularLoad: any) {
        console.log("OVERRIDE");
        this.eventsNames = new NoosferoKnownEvents();
    }

    ngOnInit() {
        this.angularLoad.loadScript('//barra.brasil.gov.br/barra.js');
    }

    openSearch() {
        this.eventsHubService.emitEvent(this.eventsNames.OPEN_SEARCH_FORM, null);
    }

}
