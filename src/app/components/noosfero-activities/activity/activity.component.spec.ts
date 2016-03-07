import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Pipe, Input, provide, Component} from 'ng-forward';
import {provideFilters} from '../../../../spec/helpers';

import {NoosferoActivity} from './activity.component';

const tcb = new TestComponentBuilder();

const htmlTemplate: string = '<noosfero-activity [activity]="ctrl.activity"></noosfero-activity>';


describe("Components", () => {

    describe("Noosfero Activity", () => {

        beforeEach(angular.mock.module("templates"));

        @Component({
            selector: 'test-container-component',
            template: htmlTemplate,
            directives: [NoosferoActivity],
            providers: provideFilters("truncateFilter", "stripTagsFilter")
        })
        class BlockContainerComponent {
            activity = { name: "activity1", verb: "create_article" };
        }

        it("render the specific template for an activity verb", done => {
            tcb.createAsync(BlockContainerComponent).then(fixture => {
                let component: NoosferoActivity = fixture.debugElement.componentViewChildren[0].componentInstance;
                expect(component.getActivityTemplate()).toEqual('app/components/noosfero-activities/activity/create_article.html');
                expect(fixture.debugElement.queryAll(".activity.create_article").length).toEqual(1);
                done();
            });
        });
    });

});
