import { TranslatorService } from './../../../shared/services/translator.service';
import { EnvironmentService } from './../../../../lib/ng-noosfero-api/http/environment.service';
import { NgPipesModule } from 'ngx-pipes';
import { NoosferoUrlPipe } from './../../../shared/pipes/noosfero-url.pipe';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import {provideFilters} from '../../../../spec/helpers';
import * as helpers from "../../../../spec/helpers";
import {ActivityComponent} from './activity.component';

describe("Components", () => {
    describe("Noosfero Activity", () => {
        let activity = <any>{ name: "activity1", verb: "create_article", params: {} };
        let environmentService = {
            getCurrentEnvironment: (filters: any): any => {
                return Promise.resolve({ id: 1, name: 'Nosofero' });
            }
        };
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<ActivityComponent>;
        let component: ActivityComponent;

        beforeEach(async(() => {
            spyOn(mocks.environmentService, "getCurrentEnvironment").and.returnValue(Promise.resolve({}));
            TestBed.configureTestingModule({
                declarations: [ActivityComponent, NoosferoUrlPipe],
                providers: [
                    { provide: EnvironmentService, useValue: mocks.environmentService },
                    { provide: TranslatorService, useValue: mocks.translatorService }
                ],
                schemas: [NO_ERRORS_SCHEMA],
                imports: [NgPipesModule]
            });
            fixture = TestBed.createComponent(ActivityComponent);
            component = fixture.componentInstance;
        }));

        it("verify no profiles for create article activity verb", () => {
            activity = { name: "activity1", verb: "create_article",
                // The component should ignore this
                params: {
                    'follower_name': ['follower1_name', 'follower2_name'],
                    'follower_profile_custom_icon': ['follower1_icon', 'follower2_icon'],
                    'follower_url': [ { 'profile': 'follower1_url' }, { 'profile': 'follower2_url' } ]
                },
                target: { profile: {}, body: "" }
            };
            component.activity = <any>activity;
            fixture.detectChanges();
            expect(component.profiles.length).toEqual(0);
        });

        it("verify two profiles for new follower activity verb", () => {
            activity = { name: "activity1", verb: "new_follower",
                params: {
                    'follower_name': ['follower1_name', 'follower2_name'],
                    'follower_profile_custom_icon': ['follower1_icon', 'follower2_icon'],
                    'follower_url': [ { 'profile': 'follower1_url' }, { 'profile': 'follower2_url' } ]
                }
            };
            component.activity = <any>activity;
            fixture.detectChanges();
            expect(component.profiles.length).toEqual(2);
        });

        it("verify the profile has been correctly created", () => {
            activity = { name: "activity1", verb: "new_follower",
                params: {
                    'follower_name': ['follower1_name', 'follower2_name'],
                    'follower_profile_custom_icon': [ 'follower1_icon', 'follower2_icon' ],
                    'follower_url': [ { 'profile': 'follower1_url' }, { 'profile': 'follower2_url' } ]
                }
            };
            component.activity = <any>activity;
            fixture.detectChanges();
            let profiles = component.profiles;
            expect(profiles[0].name).toEqual('follower1_name');
            expect(profiles[0].identifier).toEqual('follower1_url');
            expect(profiles[0].image.url).toEqual('follower1_icon');
        });

        it("render create article template correctly", () => {
            activity = { name: "activity1", verb: "create_article", params: {}, target: { profile: {}, body: "" } };
            component.activity = <any>activity;
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css('.activity.create_article')).length).toEqual(1);
        });

        it("render add_member_in_community template correctly", () => {
            activity = { name: "add_member_in_community1", verb: "add_member_in_community", params: {} };
            component.activity = <any>activity;
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css('.activity.add_member_in_community')).length).toEqual(1);
        });

        it("render new_friendship template correctly", () => {
            activity = { name: "new_friendship1", verb: "new_friendship",
                params: {
                    'friend_name': ['friend1_name'],
                    'friend_profile_custom_icon': ['friend1_icon'],
                    'friend_url': [ { 'profile': 'friend1_url' } ]
                }
            };
            component.activity = <any>activity;
            fixture.detectChanges();
            expect(component.profiles.length).toEqual(1);
            expect(fixture.debugElement.queryAll(By.css('.activity.new_friendship')).length).toEqual(1);
        });

        it("render leave scrap template correctly", () => {
            activity = { name: "scrap1", verb: "leave_scrap", params: { receiver_url: {} } };
            component.activity = <any>activity;
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css('.activity.leave_scrap')).length).toEqual(1);
        });

        it("render new_follower template correctly", () => {
            activity = { name: "follower_one", verb: "new_follower",
                params: {
                    'follower_name': ['follower1_name', 'follower2_name'],
                    'follower_profile_custom_icon': ['follower1_icon', 'follower2_icon'],
                    'follower_url': [ { 'profile': 'follower1_url' }, { 'profile': 'follower2_url' } ]
                }
            };
            component.activity = <any>activity;
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css('.activity.new_follower')).length).toEqual(1);
        });

        it("render upload_image template correctly", () => {
            activity = { name: "some_image", verb: "upload_image", params: {} };
            component.activity = <any>activity;
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css('.activity.upload_image')).length).toEqual(1);
        });
    });

});
