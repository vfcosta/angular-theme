import {Component, Input, Inject} from "ng-forward";
import * as plugins from "../../plugins";
import {dasherize} from "ng-forward/cjs/util/helpers";

export abstract class PluginHotspot {

    constructor(protected hotspot: string) { }

    ngOnInit() {
        for (let component of plugins.hotspots) {
            if (component.hotspot === this.hotspot) {
                let directiveName = dasherize(component.name.replace('Component', ''));
                this.addHotspot(directiveName);
            }
        }
    }

    abstract addHotspot(directiveName: string): any;
}
