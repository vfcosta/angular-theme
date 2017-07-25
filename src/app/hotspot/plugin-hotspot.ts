import { AfterContentInit } from '@angular/core';
import * as plugins from '../../plugins';
import * as theme from '../../theme';

export abstract class PluginHotspot implements AfterContentInit {

    constructor(protected hotspot: string) { }

    ngAfterContentInit() {
        for (const component of plugins.hotspots.concat(plugins.ng2Hotspots).concat(theme.hotspots)) {
            if (component.hotspot === this.hotspot) {
                this.addHotspot(component);
            }
        }
    }

    abstract addHotspot(component?: any): any;
}
