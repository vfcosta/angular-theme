import { RouterModule } from '@angular/router';
import { NgModule, forwardRef } from '@angular/core';
import { SharedModule } from '../shared.module';
import * as plugins from '../../plugins';
import * as theme from '../../theme';

@NgModule({
    imports: [forwardRef(() => SharedModule), RouterModule],
    declarations: plugins.ng2Hotspots.concat(theme.hotspots),
    entryComponents: plugins.ng2Hotspots.concat(theme.hotspots),
    providers: []
})
export class HotspotModule {

}
