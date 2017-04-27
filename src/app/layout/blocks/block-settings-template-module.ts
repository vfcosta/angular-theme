import { NgModule, forwardRef } from '@angular/core';
import { HighlightsBlockSettingsComponent } from './highlights/highlights-block-settings.component';
import { SharedModule } from '../../shared.module';
import { CollapseModule, ModalModule } from 'ngx-bootstrap';
import { DragulaModule } from 'ng2-dragula';

@NgModule({
    declarations: [HighlightsBlockSettingsComponent],
    entryComponents: [HighlightsBlockSettingsComponent],
    imports: [forwardRef(() => SharedModule),
        DragulaModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    ]
})
export class BlockSettingsTemplateModule { }

export const BlockComponentList = [
    { block: 'HighlightsBlock', blockSettings: HighlightsBlockSettingsComponent }
];
