import * as plugins from "../../plugins";

export abstract class PluginHotspot {

    constructor(protected hotspot: string) { }

    ngAfterContentInit() {
        for (let component of plugins.hotspots.concat(plugins.ng2Hotspots)) {
            if (component.hotspot === this.hotspot) {
                this.addHotspot(component);
            }
        }
    }

    abstract addHotspot(component?: any): any;
}
