import * as plugins from '../../plugins';
import * as theme from '../../theme';

export abstract class PluginHotspot {

    constructor(protected hotspot: string) { }

    ngAfterContentInit() {
        for (let component of plugins.hotspots.concat(plugins.ng2Hotspots).concat(theme.hotspots)) {
            if (component.hotspot === this.hotspot) {
                this.addHotspot(component);
            }
        }
    }

    abstract addHotspot(component?: any): any;
}
