import { HotspotModule } from './hotspot.module';
import { Component, Input, Inject, NgModuleFactory, Compiler } from '@angular/core';
import { PluginHotspot } from './plugin-hotspot';

@Component({
    selector: "noosfero-hotspot-article-content",
    template: `<ng-container *ngIf="myModule && hotspotComponent">
                   <ng-container *ngComponentOutlet="hotspotComponent; ngModuleFactory: myModule;"></ng-container>
               </ng-container>`
})
export class ArticleContentHotspotComponent extends PluginHotspot {

    @Input() article: noosfero.Article;
    hotspotComponent: any;
    myModule: NgModuleFactory<any>;

    constructor(compiler: Compiler) {
        super("article_extra_content");
        compiler.compileModuleAsync(HotspotModule).then(value => {
            this.myModule = value;
        });
    }

    addHotspot(component: any) {
        this.hotspotComponent = component;
    }
}
