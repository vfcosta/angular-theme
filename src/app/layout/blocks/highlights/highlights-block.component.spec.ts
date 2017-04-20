import { HighlightsBlockComponent } from './highlights-block.component';
import * as helpers from "../../../../spec/helpers";
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap';

describe("Highlights Block Component", () => {

    let mocks = helpers.getMocks();
    let fixture: ComponentFixture<HighlightsBlockComponent>;
    let component: HighlightsBlockComponent;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [HighlightsBlockComponent],
            schemas: [NO_ERRORS_SCHEMA],
            // imports: [CarouselModule.forRoot()]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(HighlightsBlockComponent);
            component = fixture.componentInstance;
            component.block = <any>{ settings: { interval: 2, shuffle: true } };
        });
    }));

    it("link target should be empty when new_window is false", () => {
        expect(component.getTarget({ new_window: false })).toEqual("");
    });

    it("link target should be _blank when new_window is true", () => {
        expect(component.getTarget({ new_window: true })).toEqual("_blank");
    });

    it("return transition interval in miliseconds", () => {
        expect(component.getTransitionInterval()).toEqual(2000);
    });

    it("not render highlights block if there is no image", () => {
        fixture.detectChanges();
        expect(component.block.hide).toBeTruthy();
    });

    it("render highlights block if there are images on block", () => {
        component.block.api_content = { slides: [{ id: 1 }] };
        component.ngOnInit();
        expect(component.block.hide).toBeFalsy();
    });

    it("not render highlights block if images array is empty", () => {
        component.block.api_content = { slides: [] };
        component.ngOnInit();
        expect(component.block.hide).toBeTruthy();
    });

    it("transition interval should be zero in design mode", () => {
        (<any>component.block.settings).interval = 5;
        component.designMode = true;
        expect(component.getTransitionInterval()).toEqual(0);
    });

    it("return transition interval in miliseconds when not in design mode", () => {
        (<any>component.block.settings).interval = 5;
        component.designMode = false;
        expect(component.getTransitionInterval()).toEqual(5000);
    });
});
