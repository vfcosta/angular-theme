import { HotspotModule } from './hotspot.module';
import {Component, Input, Inject, NgModuleFactory, Compiler} from "@angular/core";
import * as plugins from "../../plugins";
import {PluginHotspot} from "./plugin-hotspot";

@Component({
    selector: "noosfero-hotspot-comment-form",
    template: `<ng-container *ngIf="myModule && hotspotComponent">
                   <ng-container *ngComponentOutlet="hotspotComponent; ngModuleFactory: myModule;"></ng-container>
               </ng-container>`
})
export class CommentFormHotspotComponent extends PluginHotspot {

    @Input() comment: noosfero.Comment;
    @Input() parent: noosfero.Comment;
    hotspotComponent: any;
    myModule: NgModuleFactory<any>;

    constructor(compiler: Compiler) {
        super("comment_form_extra_contents");
        compiler.compileModuleAsync(HotspotModule).then(value => {
            this.myModule = value;
        });
    }

    addHotspot(component: any) {
        this.hotspotComponent = component;
    }
}
