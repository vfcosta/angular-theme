import { HotspotModule } from './hotspot.module';
import { Component, Input, Inject, NgModuleFactory, Compiler } from '@angular/core';
import { PluginHotspot } from './plugin-hotspot';
import * as plugins from '../../plugins';

@Component({
    selector: "noosfero-hotspot-article-toolbar",
    template: `<ng-container *ngIf="myModule && hotspotComponent">
                <ng-container *ngComponentOutlet="hotspotComponent; ngModuleFactory: myModule;"></ng-container>
               </ng-container>`
})
export class ArticleToolbarHotspotComponent extends PluginHotspot {

    @Input() article: noosfero.Article;
    hotspotComponent: any;
    myModule: NgModuleFactory<any>;

    constructor(private compiler: Compiler) {
        super("article_extra_toolbar_buttons");
        compiler.compileModuleAsync(HotspotModule).then(value => {
            this.myModule = value;
        });
    }

    addHotspot(component: any) {
        this.hotspotComponent = component;
    }
}
