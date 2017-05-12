import { NgModule, forwardRef } from '@angular/core';
import { SharedModule } from '../shared.module';
import * as types from './types';

@NgModule({
    imports: [forwardRef(() => SharedModule)],
    declarations: (<any>Object).values(types),
    entryComponents: (<any>Object).values(types),
    providers: []
})
export class TaskModule {

}
