import { tick, fakeAsync, async, TestBed, ComponentFixture } from '@angular/core/testing';
import {PersonTagsPluginInterestsBlockComponent} from './person-tags-plugin-interests-block.component';
import * as helpers from "./../../../../spec/helpers";
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe("Components", () => {
    describe("Person Tags Interests Block Component", () => {

        let fixture: ComponentFixture<PersonTagsPluginInterestsBlockComponent>;
        let component: PersonTagsPluginInterestsBlockComponent;
        let mocks = helpers.getMocks();

         beforeEach(async(() => {
            spyOn(mocks.personService, 'getTags').and.returnValue(
                Promise.resolve({ data: ['foo', 'bar'], headers: (name: string) => { return name; } })
            );

            TestBed.configureTestingModule({
                declarations: [PersonTagsPluginInterestsBlockComponent],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    { provide: "personService", useValue: mocks.personService },
                ]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(PersonTagsPluginInterestsBlockComponent);
                component = fixture.componentInstance;
                component.block = { type: 'Block', settings: {}, hide: false };
            });
        }));

        it("get tags from the person service", fakeAsync(() => {
            fixture.detectChanges();
            tick();
            expect(component.tags).toEqual(['foo', 'bar']);
        }));

        it("don't show tags block if it have no tags", fakeAsync(() => {
            TestBed.get('personService').getTags = jasmine.createSpy("getTags").and.returnValue(
                Promise.resolve({ data: [], headers: (name: string) => { return name; } })
            );
            fixture.detectChanges();
            tick();
            expect(component.block.hide).toBeTruthy();
        }));

    });
});
