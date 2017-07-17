import { HotspotModule } from './../../hotspot/hotspot.module';
import { Component, Input, Inject, NgModuleFactory, Compiler, ViewEncapsulation } from '@angular/core';
import { PluginHotspot } from '../../hotspot/plugin-hotspot';

@Component({
    selector: 'theme-footer',
    templateUrl: './theme-footer.html',
    styleUrls: ['./theme-footer.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ThemeFooterComponent extends PluginHotspot {

    hotspotComponent: any;
    myModule: NgModuleFactory<any>;

    constructor(compiler: Compiler) {
        super('theme_footer');
        compiler.compileModuleAsync(HotspotModule).then(value => {
            this.myModule = value;
        });
    }

    addHotspot(component: any) {
        this.hotspotComponent = component;
    }
}
