import { NgModule, forwardRef } from '@angular/core';
import { SharedModule } from '../shared.module';
import * as types from './types';
import * as _ from 'lodash';

@NgModule({
    imports: [forwardRef(() => SharedModule)],
    declarations: _.values<any>(types),
    entryComponents: _.values<any>(types),
    providers: []
})
export class TaskModule {

}
