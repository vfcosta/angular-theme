import { OnInit, Component, Inject, ViewEncapsulation } from '@angular/core';
import { EventsHubService } from '../../../../../src/app/shared/services/events-hub.service';
import { NoosferoKnownEvents } from '../../../../../src/app/known-events';
import { BodyStateClassesService } from '../../../../../src/app/shared/services/body-state-classes.service';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ng2-page-scroll';
import { DOCUMENT } from '@angular/platform-browser';
import { Hotspot } from '../../../../../src/app/hotspot/hotspot.decorator';
import * as utils from '../../../../../src/app/shared/utils';

@Component({
    selector: 'participa-header',
    templateUrl: './participa-header.html',
    styleUrls: ['./participa-header.scss'],
    encapsulation: ViewEncapsulation.None,
})
@Hotspot('theme_header')
export class ParticipaHeaderComponent implements OnInit {

    eventsNames: NoosferoKnownEvents;
    defaultSkin = 'skin-yellow';
    highContrastSkin = 'skin-high-contrast';

    constructor(private eventsHubService: EventsHubService,
        private pageScrollService: PageScrollService,
        @Inject(DOCUMENT) private document: any,
        private bodyStateClassesService: BodyStateClassesService) {
        this.eventsNames = new NoosferoKnownEvents();
    }

    ngOnInit() {
        utils.loadScript('//barra.brasil.gov.br/barra.js');
        this.setupBarraBrasil();
    }

    scrollTo(anchor: string) {
        const pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, `#${anchor}`);
        this.pageScrollService.start(pageScrollInstance);
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
