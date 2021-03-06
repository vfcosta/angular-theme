import { EnvironmentService } from './../../../../lib/ng-noosfero-api/http/environment.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { tick, async, fakeAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import * as helpers from '../../../../spec/helpers';
import { TagsBlockComponent } from './tags-block.component';

describe("Components", () => {
    describe("Tags Block Component", () => {
        const mocks = helpers.getMocks();

        let fixture: ComponentFixture<TagsBlockComponent>;
        let component: TagsBlockComponent;

        const environmentService = jasmine.createSpyObj("environmentService", ["getCurrentEnvironment", "getTags"]);

        environmentService.getCurrentEnvironment = jasmine.createSpy("getCurrentEnvironment").and.returnValue(
            Promise.resolve({ id: 1, name: 'Noosfero', host: "https://noosfero.org" })
        );

        environmentService.getTags = jasmine.createSpy("getTags").and.returnValue(
            Promise.resolve({data: [{"name": "foo", "count": 10}, {"name": "bar", "count": 20}]})
        );

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [],
                declarations: [TagsBlockComponent],
                providers: [
                    { provide: EnvironmentService, useValue: environmentService},
                ],
                schemas: [NO_ERRORS_SCHEMA]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(TagsBlockComponent);
                component = fixture.componentInstance;
            });
        }));

        it("get tags from the environment service", fakeAsync(() => {
            fixture.detectChanges();
            tick();
            expect(environmentService.getTags).toHaveBeenCalled();
            expect(component.tags).toEqual([{ text: "foo", weight: 10, link: '/search?tag=foo' }, { text: "bar", weight: 20, link: '/search?tag=bar' }]);
        }));
    });
});
