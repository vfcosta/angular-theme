import { UiSrefDirective } from './../../../shared/directives/ui-sref-directive';
import { TranslatePipe } from './../../../shared/pipes/translate-pipe';
import { ProfileImageComponent } from './../../../profile/image/profile-image.component';
import { By } from '@angular/platform-browser';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MembersBlockComponent } from './members-block.component';
import * as helpers from "../../../../spec/helpers";

describe("Components", () => {

    describe("Members Block Component", () => {
        let fixture: ComponentFixture<MembersBlockComponent>;
        let component: MembersBlockComponent;
        let state = jasmine.createSpyObj("$state", ["href"]);
        let blockService = jasmine.createSpyObj("blockService", ["getApiContent"]);
        blockService.getApiContent = jasmine.createSpy("getApiContent").and.returnValue(Promise.resolve({ people: [{ identifier: "person1" }] }));

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [MembersBlockComponent, TranslatePipe, UiSrefDirective],
                providers: [
                    { provide: "blockService", useValue: blockService },
                    { provide: "$state", useValue: state }
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(MembersBlockComponent);
                component = fixture.componentInstance;
                component.block = <noosfero.Block>{ id: 1 };
            });
        }));

        it("get block with one member", (fakeAsync(() => {
            fixture.detectChanges();
            tick();
            expect(blockService.getApiContent).toHaveBeenCalled();
            expect(component.profiles[0].identifier).toEqual("person1");
        })));

        it("render the profile image for each community", (fakeAsync(() => {
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css('noosfero-profile-image')).length).toEqual(1);
        })));

        it("render the noosfero communities block", () => {
            expect(fixture.debugElement.queryAll(By.css(".membersblock")).length).toEqual(1);
        });
    });
});
