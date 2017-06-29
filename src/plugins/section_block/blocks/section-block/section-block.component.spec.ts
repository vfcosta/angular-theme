import { TranslatorService } from './../../../../app/shared/services/translator.service';
import { BlockService } from './../../../../lib/ng-noosfero-api/http/block.service';
import { SectionBlockComponent } from './section-block.component';
import * as helpers from "./../../../../spec/helpers";
import { PopoverModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { TranslateModule } from '@ngx-translate/core';

describe("Components", () => {
    describe("Section Block Component", () => {
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<SectionBlockComponent>;
        let component: SectionBlockComponent;
        let person = mocks.person;
        let block: any;
        let blockService = mocks.blockService;

        beforeEach(async(() => {
            blockService.uploadImages = jasmine.createSpy("uploadImages").and.returnValue(Promise.resolve({}));

            TestBed.configureTestingModule({
                declarations: [SectionBlockComponent],
                providers: [
                    { provide: BlockService, useValue: blockService },
                    { provide: TranslatorService, useValue: mocks.translatorService }
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                imports: [PopoverModule.forRoot(), FormsModule, TranslateModule.forRoot()]
            });
            fixture = TestBed.createComponent(SectionBlockComponent);
            component = fixture.componentInstance;
            component.owner = person;
            component.designMode = true;

            block = {
                id: 1,
                settings: { name: 'some name', description: 'some description' },
                images: [{
                    id: 1, filename: "file1.png",
                    url: "/image_uploads/0000/0005/file1.png"
                },
                    {
                        id: 2, filename: "file2.png",
                        url: "/image_uploads/0000/0005/file2.png"
                    }
                ]
            };
            component.block = block;
            fixture.detectChanges();
            spyOn(component.popover, 'hide').and.callThrough();
        }));

        it("should hide if there is no image, name, description or title", () => {
            component.block = {
                id: 1,
                title: undefined,
                settings: { name: undefined, description: undefined },
                images: []
            };
            component.ngOnChanges();
            expect(component.block.hide).toBeTruthy();
        });

        it("should show if there is a title", () => {
            component.block = {
                id: 1,
                title: 'Section Block',
                settings: { name: undefined, description: undefined },
                images: []
            };
            component.ngOnChanges();
            expect(component.block.hide).toBeFalsy();
        });

        it("should show if there is a name", () => {
            component.block = {
                id: 1,
                title: undefined,
                settings: { name: 'mariko', description: undefined },
                images: []
            };
            component.ngOnChanges();
            expect(component.block.hide).toBeFalsy();
        });

        it("should show if there is a descriton", () => {
            component.block = {
                id: 1,
                title: undefined,
                settings: { name: undefined, description: 'nice manga' },
                images: []
            };
            component.ngOnChanges();
            expect(component.block.hide).toBeFalsy();
        });

        it("should show if there is an image", () => {
            component.block = {
                id: 1,
                title: undefined,
                settings: { name: undefined, description: undefined },
                images: [{
                    id: 1, filename: "file1.png",
                    url: "/image_uploads/0000/0005/file1.png"
                }]
            };
            component.ngOnChanges();
            expect(component.block.hide).toBeFalsy();
        });

        it("initialize modifiedLink link", fakeAsync(() => {
            component.ngOnInit();
            tick();
            expect(component.modifiedLink).toEqual(block.settings);
        }));

        it("should display section name", () => {
            expect(fixture.debugElement.nativeElement.querySelector(".section-block .name").innerHTML).toContain(block.settings.name);
        });

        it("should display section description", () => {
            expect(fixture.debugElement.nativeElement.querySelector(".section-block .description").innerHTML).toContain(block.settings.description);
        });

        it("should return the last image of component images list", () => {
            expect(component.getSectionImage()).toEqual(block.images[1]);
        });

        it("should return null if there is an empty array in component images list", () => {
            component.block.images = [];
            expect(component.getSectionImage()).toBeNull();
        });

        it("should return null if images block attribute is null", () => {
            component.block.images = null;
            expect(component.getSectionImage()).toBeNull();
        });

        it("should show the last image from block images", () => {
            expect(fixture.debugElement.nativeElement.querySelector(".section-image").src).toContain('/image_uploads/0000/0005/file2.png');
        });

        it("not show image if there is no image", () => {
            component.block.images = [];
            fixture.detectChanges();
            expect(fixture.debugElement.nativeElement.querySelector(".section-image")).toBeFalsy();
        });

        it("copyLink copy the link present in block to modifiedLink variable", () => {
            component.modifiedLink = {};
            expect(component.modifiedLink).toEqual({});
            component.block.settings = { name: 'another name', description: 'another description' };
            component.copyLink();
            expect(component.modifiedLink).toEqual(component.block.settings);
        });

        it("cancel copy the old link present in block attribute", () => {
            let newLink = { name: 'new name link', description: 'new description link' }
            component.modifiedLink = newLink;
            expect(component.modifiedLink).toEqual(newLink);
            component.block.settings = { name: 'another name', description: 'another description' };
            component.cancel();
            expect(component.modifiedLink).toEqual(component.block.settings);
        });

        it("cancel should call hide popover function", () => {
            component.cancel();
            expect(component.popover.hide).toHaveBeenCalled();
        });

        it("save should call hide popover function", () => {
            component.save();
            expect(component.popover.hide).toHaveBeenCalled();
        });

        it("save shoulld copy modifiedLink value to block attributes", () => {
            let newLink = { name: 'new name link', description: 'new description link' }
            component.modifiedLink = newLink;
            expect(component.block.settings === component.modifiedLink).toBeFalsy();
            component.save();
            expect(component.block.settings).toEqual(component.modifiedLink);
        });

        it("should uploadImages service be called by upload method", () => {
            let data = {};
            component.upload(data);
            expect(blockService.uploadImages).toHaveBeenCalledWith(component.block, [data]);
        });

        it("should upload set new information to block", fakeAsync(() => {
            let data = { data: { id: 3 } };
            component['blockService'].uploadImages = jasmine.createSpy("uploadImages").and.returnValue(Promise.resolve(data));
            component.upload(data);
            tick();
            expect(component.block).toEqual(data.data);
        }));

        it("should set background color in view", () => {
            let color = 'ff0000'
            component.backgroundColor = color;
            fixture.detectChanges();

            expect(fixture.debugElement.nativeElement.querySelector(".section-block").style.backgroundColor).toContain('rgb(255, 0, 0)');
        });

        it("should set color color in view", () => {
            let color = 'ff00ff'
            component.fontColor = color;
            fixture.detectChanges();

            expect(fixture.debugElement.nativeElement.querySelector(".section-block").style.color).toContain('rgb(255, 0, 255)');
        });

    });

});
