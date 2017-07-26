import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {RawHTMLBlockComponent} from './raw-html-block.component';

const htmlTemplate = '<noosfero-raw-htmlblock [block]="block" [owner]="owner"></noosfero-raw-htmlblock>';

describe("Components", () => {

    describe("Raw Html Block Component", () => {

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [RawHTMLBlockComponent]
            });
        }));

        it('display html stored in block settings', () => {
            const fixture = TestBed.createComponent(RawHTMLBlockComponent);
            fixture.componentInstance.block = { settings: { html: '<p>block content</p>' } };
            fixture.componentInstance.owner = { name: 'profile-name' };
            fixture.detectChanges();
            expect(fixture.debugElement.nativeElement.querySelector(".raw-html-block p").innerHTML).toEqual('block content');
        });

        it('display id attribute from html tags', () => {
            const fixture = TestBed.createComponent(RawHTMLBlockComponent);
            fixture.componentInstance.block = { settings: { html: '<p id="test">block content</p>' } };
            fixture.componentInstance.owner = { name: 'profile-name' };
            fixture.detectChanges();
            expect(fixture.debugElement.nativeElement.querySelector(".raw-html-block #test").innerHTML).toEqual('block content');
        });

        it("should hide if there is no html content", () => {
            const fixture = TestBed.createComponent(RawHTMLBlockComponent);
            fixture.componentInstance.block = { settings: {} };
            fixture.componentInstance.owner = { name: 'profile-name' };
            fixture.componentInstance.ngOnChanges();
            expect(fixture.componentInstance.block.hide).toBeTruthy();
        });

        it("should show if there is html content", () => {
            const fixture = TestBed.createComponent(RawHTMLBlockComponent);
            fixture.componentInstance.block = { settings: { html: '<p>block content</p>' } };
            fixture.componentInstance.owner = { name: 'profile-name' };
            fixture.componentInstance.ngOnChanges();
            expect(fixture.componentInstance.block.hide).toBeFalsy();
        });
    });

});
