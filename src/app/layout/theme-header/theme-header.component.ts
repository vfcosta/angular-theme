import { HotspotModule } from './../../hotspot/hotspot.module';
import { Component, Input, Inject, NgModuleFactory, Compiler } from '@angular/core';
import { PluginHotspot } from '../../hotspot/plugin-hotspot';

@Component({
    selector: 'theme-header',
    template: `<ng-container *ngIf="myModule && hotspotComponent">
                <ng-container *ngComponentOutlet="hotspotComponent; ngModuleFactory: myModule;"></ng-container>
            </ng-container>`
})
export class ThemeHeaderComponent extends PluginHotspot {

    hotspotComponent: any;
    myModule: NgModuleFactory<any>;

    constructor(compiler: Compiler) {
        super('theme_header');
        compiler.compileModuleAsync(HotspotModule).then(value => {
            this.myModule = value;
        });
    }

    addHotspot(component: any) {
        this.hotspotComponent = component;
    }
}
