import * as plugins from "../../plugins";
import {dasherize} from "ng-forward/cjs/util/helpers";

export abstract class PluginHotspot {

    constructor(protected hotspot: string) { }

    ngAfterContentInit() {
        for (let component of plugins.hotspots.concat(plugins.ng2Hotspots)) {
            if (component.hotspot === this.hotspot) {
                let directiveName = dasherize(component.name.replace('Component', ''));
                this.addHotspot(directiveName, component);
            }
        }
    }

    abstract addHotspot(directiveName: string, component?: any): any;
}
