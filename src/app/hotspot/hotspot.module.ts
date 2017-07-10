import { NgModule, forwardRef } from '@angular/core';
import { SharedModule } from '../shared.module';
import * as plugins from '../../plugins';

@NgModule({
    imports: [forwardRef(() => SharedModule)],
    declarations: plugins.ng2Hotspots,
    entryComponents: plugins.ng2Hotspots,
    providers: []
})
export class HotspotModule {

}
