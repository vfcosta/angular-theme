import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Pipe, Input, provide, Component} from 'ng-forward';
import {provideFilters} from '../../../spec/helpers';

import {ActivitiesComponent} from './activities.component';

const tcb = new TestComponentBuilder();

const htmlTemplate: string = '<noosfero-activities [activities]="ctrl.activities"></noosfero-activities>';


describe("Components", () => {

    describe("Noosfero Activities", () => {

        beforeEach(angular.mock.module("templates"));

        @Component({
            selector: 'test-container-component',
            template: htmlTemplate,
            directives: [ActivitiesComponent],
            providers: provideFilters("truncateFilter", "stripTagsFilter", "translateFilter")
        })
        class BlockContainerComponent {
            activities = [{ name: "activity1", verb: "create_article" }, { name: "activity2", verb: "create_article" }];
        }

        it("render a noosfero activity tag for each activity", done => {
            tcb.createAsync(BlockContainerComponent).then(fixture => {
                expect(fixture.debugElement.queryAll("noosfero-activity").length).toEqual(2);
                done();
            });
        });
    });

});
