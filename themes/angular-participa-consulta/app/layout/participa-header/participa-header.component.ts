import { Component, Inject, provide } from "ng-forward";
import { EventsHubService } from "../../../../../src/app/shared/services/events-hub.service";
import { NoosferoKnownEvents } from "../../../../../src/app/known-events";

@Component({
    selector: "participa-header",
    templateUrl: "app/layout/participa-header/participa-header.html",
    providers: [
        provide('eventsHubService', { useClass: EventsHubService })
    ]
})
@Inject(EventsHubService, "angularLoad")
export class ParticipaHeaderComponent {

    eventsNames: NoosferoKnownEvents;

    constructor(private eventsHubService: EventsHubService, private angularLoad: any) {
        this.eventsNames = new NoosferoKnownEvents();
    }

    ngOnInit() {
        this.angularLoad.loadScript('//barra.brasil.gov.br/barra.js');
    }

    openSearch() {
        this.eventsHubService.emitEvent(this.eventsNames.OPEN_SEARCH_FORM, null);
    }

}
