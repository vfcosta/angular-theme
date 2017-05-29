import { Component, Inject } from "@angular/core";
import { EventsHubService } from "../../../../../src/app/shared/services/events-hub.service";
import { NoosferoKnownEvents } from "../../../../../src/app/known-events";
import { BodyStateClassesService } from "../../../../../src/app/shared/services/body-state-classes.service";

@Component({
    selector: "participa-header",
    template: require("app/layout/participa-header/participa-header.html")
})
export class ParticipaHeaderComponent {

    eventsNames: NoosferoKnownEvents;
    defaultSkin = 'skin-yellow';
    highContrastSkin = 'skin-high-contrast';

    constructor(@Inject("eventsHubService") private eventsHubService: EventsHubService,
        @Inject("angularLoad") private angularLoad: any,
        @Inject("$location") private $location: any,
        @Inject("$anchorScroll") private $anchorScroll: any,
        @Inject("bodyStateClassesService") private bodyStateClassesService: BodyStateClassesService) {
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
