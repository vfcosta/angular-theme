import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Pipe, Input, provide, Component} from 'ng-forward';
import {provideFilters} from '../../../../spec/helpers';

import {ActivityComponent} from './activity.component';

const tcb = new TestComponentBuilder();

const htmlTemplate: string = '<noosfero-activity [activity]="ctrl.activity"></noosfero-activity>';


describe("Components", () => {

    describe("Noosfero Activity", () => {
        let activity = { name: "activity1", verb: "create_article" };

        beforeEach(angular.mock.module("templates"));

        @Component({
            selector: 'test-container-component',
            template: htmlTemplate,
            directives: [ActivityComponent],
            providers: provideFilters("truncateFilter", "stripTagsFilter", "translateFilter")
        })

        class BlockContainerComponent {
            activity = activity;
        }

        it("render the specific template for an activity verb", done => {
            tcb.createAsync(BlockContainerComponent).then(fixture => {
                let component: ActivityComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                expect(component.getActivityTemplate()).toEqual('app/profile/activities/activity/create_article.html');
                done();
            });
        });

        it("render create article template correctly", done => {
            activity = { name: "activity1", verb: "create_article" };
            tcb.createAsync(BlockContainerComponent).then(fixture => {
                let component: ActivityComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                expect(fixture.debugElement.queryAll(".activity.create_article").length).toEqual(1);
                done();
            });
        });

        it("render add_member_in_community template correctly", done => {
            activity = { name: "add_member_in_community1", verb: "add_member_in_community" };
            tcb.createAsync(BlockContainerComponent).then(fixture => {
                let component: ActivityComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                expect(fixture.debugElement.queryAll(".activity.add_member_in_community").length).toEqual(1);
                done();
            });
        });

        it("render new_friendship template correctly", done => {
            activity = { name: "new_friendship1", verb: "new_friendship" };
            tcb.createAsync(BlockContainerComponent).then(fixture => {
                let component: ActivityComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                expect(fixture.debugElement.queryAll(".activity.new_friendship").length).toEqual(1);
                done();
            });
        });

        it("render leave scrap template correctly", done => {
            activity = { name: "scrap1", verb: "leave_scrap" };
            tcb.createAsync(BlockContainerComponent).then(fixture => {
                let component: ActivityComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                expect(fixture.debugElement.queryAll(".activity.leave_scrap").length).toEqual(1);
                done();
            });
        });

        it("render upload_image template correctly", done => {
            activity = { name: "some_image", verb: "upload_image" };
            tcb.createAsync(BlockContainerComponent).then(fixture => {
                let component: ActivityComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                expect(fixture.debugElement.queryAll(".activity.upload_image").length).toEqual(1);
                done();
            });
        });
    });

});
