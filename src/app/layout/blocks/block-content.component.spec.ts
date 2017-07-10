import { By } from '@angular/platform-browser';
import { BlockContentComponent } from './block-content.component';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as helpers from '../../../spec/helpers';

describe("Components", () => {
    describe("Block Component", () => {
        let fixture: ComponentFixture<BlockContentComponent>;
        let component: BlockContentComponent;
        let mocks = helpers.getMocks();

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [BlockContentComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
            });
            fixture = TestBed.createComponent(BlockContentComponent);
            component = fixture.componentInstance;
        }));

        it("renders a component which matches to the block type", () => {
            component.block = { type: 'CommunitiesBlock' };
            component.owner = { name: 'profile-name' };
            fixture.detectChanges();
            expect(component.block.type).toEqual("CommunitiesBlock");
            expect(fixture.debugElement.queryAll(By.css('noosfero-communities-block')).length).toEqual(1);
        });
    });
});
