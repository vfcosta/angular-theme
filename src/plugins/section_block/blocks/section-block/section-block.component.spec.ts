import { TranslatePipe } from './../../../../app/shared/pipes/translate-pipe';
import { SectionBlockComponent } from './section-block.component';
import * as helpers from "./../../../../spec/helpers";
import { PopoverModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';


describe("Components", () => {
    describe("Section Block Component", () => {
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<SectionBlockComponent>;
        let component: SectionBlockComponent;
        let person = mocks.person;
        let block = {
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

        beforeEach(async(() => {
            spyOn(mocks.profileService, 'getCurrentProfile').and.callThrough();
            spyOn(mocks.communityService, 'sendInvitations');
            spyOn(mocks.personService, 'search').and.callThrough();

            TestBed.configureTestingModule({
                declarations: [SectionBlockComponent, TranslatePipe],
                providers: [
                    { provide: "blockService", useValue: mocks.blockService },
                    { provide: "translatorService", useValue: mocks.translatorService }
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                imports: [PopoverModule.forRoot(), FormsModule]
            });
            fixture = TestBed.createComponent(SectionBlockComponent);
            component = fixture.componentInstance;
            component.owner = person;
            component.block = block;
            fixture.detectChanges();
        }));


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
        it("should show the last image from block images", () => {
            expect(fixture.debugElement.nativeElement.querySelector(".section-image").src).toContain('/image_uploads/0000/0005/file2.png');
        });

        it("not show image if there is no image", () => {
            component.block.images = [];
            fixture.detectChanges();
            expect(fixture.debugElement.nativeElement.querySelector(".section-image")).toBeFalsy();
        });

        //FIXME make this to set text color
        //FIXME make this to set background color

    });

});
