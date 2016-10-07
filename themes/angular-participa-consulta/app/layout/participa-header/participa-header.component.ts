import { Component, Inject, provide } from "ng-forward";
import { EventsHubService } from "../../../../../src/app/shared/services/events-hub.service";
import { NoosferoKnownEvents } from "../../../../../src/app/known-events";
import { BodyStateClassesService } from "../../../../../src/app/layout/services/body-state-classes.service";

@Component({
    selector: "participa-header",
    templateUrl: "app/layout/participa-header/participa-header.html",
    providers: [
        provide('eventsHubService', { useClass: EventsHubService })
    ]
})
@Inject(EventsHubService, "angularLoad", "$location", "$anchorScroll", BodyStateClassesService)
export class ParticipaHeaderComponent {

    eventsNames: NoosferoKnownEvents;
    defaultSkin = "skin-yellow";

    constructor(private eventsHubService: EventsHubService,
        private angularLoad: any,
        private $location: any,
        private $anchorScroll: any,
        private bodyStateClassesService: BodyStateClassesService) {
        this.eventsNames = new NoosferoKnownEvents();
    }

    ngOnInit() {
        this.angularLoad.loadScript('//barra.brasil.gov.br/barra.js');
    }

    openSearch() {
        this.eventsHubService.emitEvent(this.eventsNames.OPEN_SEARCH_FORM, null);
    }

    scrollTo(anchor: string) {
        this.$location.hash(anchor);
        this.$anchorScroll();
        this.$location.hash(null);
    };

    toggleHighContrast() {
        if (this.bodyStateClassesService.getThemeSkin() === this.defaultSkin) {
            this.bodyStateClassesService.setThemeSkin('skin-high-contrast');
        } else {
            this.bodyStateClassesService.setThemeSkin(this.defaultSkin);
        }
    }
}
