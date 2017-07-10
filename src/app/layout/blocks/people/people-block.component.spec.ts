import { BlockService } from './../../../../lib/ng-noosfero-api/http/block.service';
import { ProfileImageComponent } from './../../../profile/image/profile-image.component';
import { By } from '@angular/platform-browser';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PeopleBlockComponent } from './people-block.component';
import * as helpers from '../../../../spec/helpers';

describe("Components", () => {

    describe("People Block Component", () => {
        let fixture: ComponentFixture<PeopleBlockComponent>;
        let component: PeopleBlockComponent;
        let state = jasmine.createSpyObj("$state", ["href"]);
        let blockService = jasmine.createSpyObj("blockService", ["getApiContent"]);
        blockService.getApiContent = jasmine.createSpy("getApiContent").and.returnValue(Promise.resolve({ people: [{ identifier: "person1" }] }));

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [PeopleBlockComponent],
                providers: [
                    { provide: BlockService, useValue: blockService },
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(PeopleBlockComponent);
                component = fixture.componentInstance;
                component.block = <noosfero.Block>{ id: 1 };
            });
        }));

        it("get block with one person", (fakeAsync(() => {
            fixture.detectChanges();
            tick();
            expect(blockService.getApiContent).toHaveBeenCalled();
            expect(component.profiles[0].identifier).toEqual("person1");
        })));

        it("render the noosfero profile-list", () => {
            expect(fixture.debugElement.queryAll(By.css("profile-list")).length).toEqual(1);
        });
    });
});
