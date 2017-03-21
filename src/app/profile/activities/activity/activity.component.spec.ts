import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Pipe, Input, provide, Component} from 'ng-forward';
import {provideFilters} from '../../../../spec/helpers';
import * as helpers from "../../../../spec/helpers";

import {ActivityComponent} from './activity.component';

const tcb = new TestComponentBuilder();

const htmlTemplate: string = '<noosfero-activity [activity]="ctrl.activity"></noosfero-activity>';


describe("Components", () => {

    describe("Noosfero Activity", () => {
        let activity = { name: "activity1", verb: "create_article", params: {} };
        let environmentService = {
            getCurrentEnvironment: (filters: any): any => {
                return Promise.resolve({ id: 1, name: 'Nosofero' });
            }
        };

        beforeEach(angular.mock.module("templates"));

        @Component({
            selector: 'test-container-component',
            template: htmlTemplate,
            directives: [ActivityComponent],
            providers: [
                helpers.createProviderToValue('EnvironmentService', environmentService)
            ].concat(provideFilters("truncateFilter", "stripTagsFilter", "translateFilter"))
        })

        class BlockContainerComponent {
            activity = activity;
        }

        it("verify no profiles for create article activity verb", done => {
            activity = { name: "activity1", verb: "create_article", 
                // The component should ignore this
                params: { 
                    'follower_name': ['follower1_name', 'follower2_name'], 
                    'follower_profile_custom_icon': ['follower1_icon', 'follower2_icon'],
                    'follower_url': [ { 'profile': 'follower1_url' }, { 'profile': 'follower2_url' } ]
                }
            };
            tcb.createAsync(BlockContainerComponent).then(fixture => {
                let component: ActivityComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                expect(component.profiles.length).toEqual(0);
                done();
            });
        });

        it("verify two profiles for new follower activity verb", done => {
            activity = { name: "activity1", verb: "new_follower", 
                params: { 
                    'follower_name': ['follower1_name', 'follower2_name'], 
                    'follower_profile_custom_icon': ['follower1_icon', 'follower2_icon'],
                    'follower_url': [ { 'profile': 'follower1_url' }, { 'profile': 'follower2_url' } ]
                }
            };
            tcb.createAsync(BlockContainerComponent).then(fixture => {
                let component: ActivityComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                expect(component.profiles.length).toEqual(2);
                done();
            });
        });

        it("verify the profile has been correctly created", done => {
            activity = { name: "activity1", verb: "new_follower", 
                params: { 
                    'follower_name': ['follower1_name', 'follower2_name'], 
                    'follower_profile_custom_icon': [ 'follower1_icon', 'follower2_icon' ],
                    'follower_url': [ { 'profile': 'follower1_url' }, { 'profile': 'follower2_url' } ]
                }
            };
            tcb.createAsync(BlockContainerComponent).then(fixture => {
                let component: ActivityComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                let profiles = component.profiles;
                expect(profiles[0].name).toEqual('follower1_name');
                expect(profiles[0].identifier).toEqual('follower1_url');
                expect(profiles[0].image.url).toEqual('follower1_icon');
                done();
            });
        });

        it("render the specific template for an activity verb", done => {
            activity = { name: "activity1", verb: "create_article", params: {} };
            tcb.createAsync(BlockContainerComponent).then(fixture => {
                let component: ActivityComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                expect(component.getActivityTemplate()).toEqual('app/profile/activities/activity/create_article.html');
                done();
            });
        });

        it("render create article template correctly", done => {
            activity = { name: "activity1", verb: "create_article", params: {} };
            tcb.createAsync(BlockContainerComponent).then(fixture => {
                let component: ActivityComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                expect(fixture.debugElement.queryAll(".activity.create_article").length).toEqual(1);
                done();
            });
        });

        it("render add_member_in_community template correctly", done => {
            activity = { name: "add_member_in_community1", verb: "add_member_in_community", params: {} };
            tcb.createAsync(BlockContainerComponent).then(fixture => {
                let component: ActivityComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                expect(fixture.debugElement.queryAll(".activity.add_member_in_community").length).toEqual(1);
                done();
            });
        });

        it("render new_friendship template correctly", done => {
            activity = { name: "new_friendship1", verb: "new_friendship", 
                params: { 
                    'friend_name': ['friend1_name'], 
                    'friend_profile_custom_icon': ['friend1_icon'],
                    'friend_url': [ { 'profile': 'friend1_url' } ]
                }
            };
            tcb.createAsync(BlockContainerComponent).then(fixture => {
                let component: ActivityComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                expect(component.profiles.length).toEqual(1);
                expect(fixture.debugElement.queryAll(".activity.new_friendship").length).toEqual(1);
                done();
            });
        });

        it("render leave scrap template correctly", done => {
            activity = { name: "scrap1", verb: "leave_scrap", params: {} };
            tcb.createAsync(BlockContainerComponent).then(fixture => {
                let component: ActivityComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                expect(fixture.debugElement.queryAll(".activity.leave_scrap").length).toEqual(1);
                done();
            });
        });

        it("render new_follower template correctly", done => {
            activity = { name: "follower_one", verb: "new_follower", 
                params: { 
                    'follower_name': ['follower1_name', 'follower2_name'], 
                    'follower_profile_custom_icon': ['follower1_icon', 'follower2_icon'],
                    'follower_url': [ { 'profile': 'follower1_url' }, { 'profile': 'follower2_url' } ]
                }
            };
            tcb.createAsync(BlockContainerComponent).then(fixture => {
                let component: ActivityComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                expect(fixture.debugElement.queryAll(".activity.new_follower").length).toEqual(1);
                done();
            });
        });

        it("render upload_image template correctly", done => {
            activity = { name: "some_image", verb: "upload_image", params: {} };
            tcb.createAsync(BlockContainerComponent).then(fixture => {
                let component: ActivityComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                expect(fixture.debugElement.queryAll(".activity.upload_image").length).toEqual(1);
                done();
            });
        });
    });

});
