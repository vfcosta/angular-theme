import { Input, Inject, Component, ComponentFactoryResolver, NgModuleFactory, Compiler } from '@angular/core';
import { BlockSettingsTemplateModule, BlockComponentList } from './block-settings-template-module';

@Component({
    selector: 'noosfero-block-settings',
    template: `<ng-container *ngIf="myModule">
    <ng-container *ngComponentOutlet="blockSettingsComponent;
                                      ngModuleFactory: myModule;"></ng-container>
                                      </ng-container>`
})
export class BlockSettingsComponent {

    @Input() block: any;
    @Input() owner: any;

    blockSettingsComponent: any;
    myModule: NgModuleFactory<any>;
    constructor(compiler: Compiler) {
        compiler.compileModuleAsync(BlockSettingsTemplateModule).then(value => {
            this.myModule = value;
        });
    }

    ngAfterContentInit() {
        let blockSettingsConfig = this.block ? BlockComponentList.find(b => b.block === this.block.type) : undefined;
        this.blockSettingsComponent = (blockSettingsConfig && blockSettingsConfig.blockSettings) ? blockSettingsConfig.blockSettings : undefined;
    }
}
