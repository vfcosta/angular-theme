import { BlockService } from './../../../../lib/ng-noosfero-api/http/block.service';
import { ProfileImagesBlockComponent } from './profile-images-block.component';
import * as helpers from './../../../../spec/helpers';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { NoosferoUrlPipe } from './../../../../app/shared/pipes/noosfero-url.pipe';
import { By } from '@angular/platform-browser';

describe("Components", () => {
    describe("Plugin Profile Images - Profile Images  Block Component", () => {
        const mocks = helpers.getMocks();
        let fixture: ComponentFixture<ProfileImagesBlockComponent>;
        let component: ProfileImagesBlockComponent;
        const person = <noosfero.Person>{ id: 1 };

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [ProfileImagesBlockComponent, NoosferoUrlPipe],
                providers: [
                    { provide: BlockService, useValue: mocks.blockService }
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(ProfileImagesBlockComponent);
                component = fixture.componentInstance;
                component.owner = person;
                component.block = <noosfero.Block>{ id: 1 };
            });
        }));

        it("verify getApiContent is called ", fakeAsync(() => {
            component['blockService'].getApiContent = jasmine.createSpy("getApiContent").and.returnValue(Promise.resolve({}));
            component.ngOnInit();
            tick();
            expect(component['blockService'].getApiContent).toHaveBeenCalledWith(component.block);
        }));

        it("set images getting content from api ", fakeAsync(() => {
            const images = [{ id: 1 }];
            component['blockService'].getApiContent = jasmine.createSpy("getApiContent").and.returnValue(Promise.resolve({ images: images }));
            component.ngOnInit();
            tick();
            expect(component.images).toBe(images);
        }));

        it("set profile on component initialization", () => {
            component.ngOnInit();
            expect(component.profile).toBe(person);
        });

        it("render the images defined on block", fakeAsync(() => {
            const images = [
                { id: 1, title: 'Test', view_url: { host: 'localhost', page: ['image'] }, path: '/articles/0000/0001/test.png' },
                { id: 2, title: 'Test', view_url: { host: 'localhost', page: ['image'] }, path: '/articles/0000/0002/test.png' },
                { id: 3, title: 'Test', view_url: { host: 'localhost', page: ['image'] }, path: '/articles/0000/0003/test.png' },
            ];
            component['blockService'].getApiContent = jasmine.createSpy("getApiContent").and.returnValue(Promise.resolve({ images: images }));
            component.ngOnInit();
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css(".image-block")).length).toEqual(3);
        }));
    });

});
