import { BlockService } from './../../../../lib/ng-noosfero-api/http/block.service';
import { UiSrefDirective } from './../../../shared/directives/ui-sref-directive';
import { ProfileImageComponent } from './../../../profile/image/profile-image.component';
import { By } from '@angular/platform-browser';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommunitiesBlockComponent } from './communities-block.component';
import * as helpers from "../../../../spec/helpers";

describe("Components", () => {

    describe("Community Block Component", () => {
        let fixture: ComponentFixture<CommunitiesBlockComponent>;
        let component: CommunitiesBlockComponent;
        let state = jasmine.createSpyObj("$state", ["href"]);
        let blockService = jasmine.createSpyObj("blockService", ["getApiContent"]);
        blockService.getApiContent = jasmine.createSpy("getApiContent").and.returnValue(Promise.resolve({ communities: [{ identifier: "community1" }] }));

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [CommunitiesBlockComponent, UiSrefDirective],
                providers: [
                    { provide: BlockService, useValue: blockService },
                    { provide: "$state", useValue: state }
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(CommunitiesBlockComponent);
                component = fixture.componentInstance;
                component.block = <noosfero.Block>{ id: 1 };
            });
        }));

        it("get block with one community", (fakeAsync(() => {
            fixture.detectChanges();
            tick();
            expect(blockService.getApiContent).toHaveBeenCalled();
            expect(component.profiles[0].identifier).toEqual("community1");
        })));

        it("render the noosfero profile-list", () => {
            expect(fixture.debugElement.queryAll(By.css("profile-list")).length).toEqual(1);
        });
    });
});
