import { Component, Inject, provide } from "ng-forward";
import { EventsHubService } from "../../../../../src/app/shared/services/events-hub.service";
import { NoosferoKnownEvents } from "../../../../../src/app/known-events";
import { BodyStateClassesService } from "../../../../../src/app/shared/services/body-state-classes.service";

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
    defaultSkin = 'skin-yellow';
    highContrastSkin = 'skin-high-contrast';

    constructor(private eventsHubService: EventsHubService,
        private angularLoad: any,
        private $location: any,
        private $anchorScroll: any,
        private bodyStateClassesService: BodyStateClassesService) {
        this.eventsNames = new NoosferoKnownEvents();
    }

    ngOnInit() {
        this.angularLoad.loadScript('//barra.brasil.gov.br/barra.js');
        this.setupBarraBrasil();
    }

    scrollTo(anchor: string) {
        this.$location.hash(anchor);
        this.$anchorScroll();
        this.$location.hash(null);
    };

    toggleHighContrast() {
        if (this.bodyStateClassesService.getThemeSkin() === this.defaultSkin) {
            this.bodyStateClassesService.setThemeSkin(this.highContrastSkin);
        } else {
            this.bodyStateClassesService.setThemeSkin(this.defaultSkin);
        }
        this.setupBarraBrasil();
    }

    private setupBarraBrasil() {
        if (this.bodyStateClassesService.getThemeSkin() === this.highContrastSkin) {
            this.bodyStateClassesService.addBodyClass('contraste');
        } else {
            this.bodyStateClassesService.removeBodyClass('contraste');
        }
    }
}
