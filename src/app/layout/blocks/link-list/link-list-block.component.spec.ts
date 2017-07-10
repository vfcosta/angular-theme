import { TranslatorService } from './../../../shared/services/translator.service';
import { NoosferoTemplatePipe } from './../../../shared/pipes/noosfero-template.ng2.filter';
import * as helpers from "../../../../spec/helpers";
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { tick, fakeAsync, async, TestBed, ComponentFixture } from '@angular/core/testing';

import { LinkListBlockComponent } from './link-list-block.component';

describe("Components", () => {
    describe("Link List Block Component", () => {
        let fixture: ComponentFixture<LinkListBlockComponent>;
        let component: LinkListBlockComponent;
        let noosferoTemplate: {
            transform: () => {};
        };
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [LinkListBlockComponent, NoosferoTemplatePipe],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    { provide: TranslatorService, useValue: helpers.mocks.translatorService },
                    { provide: "noosferoTemplate", useValue: noosferoTemplate }
                ]
            });
            fixture = TestBed.createComponent(LinkListBlockComponent);
            component = fixture.componentInstance;
            component.block = {id: 1, type: 'Block', settings: {
                links: [
                    { name: "link1", address: "http://link1", icon: "fa-file-o" },
                    { name: "link2", address: "http://link2", icon: "fa-file-o" }
                ]}
            };
            component.owner = {id: 1, identifier: 'profile', name: 'profile-name'};
            fixture.detectChanges();
        }));

        it("should hide if there are no links", () => {
            component.removeLink(0);
            component.removeLink(0);
            fixture.componentInstance.ngOnChanges();
            expect(component.block.hide).toBeTruthy();
        });

        it("should show if there is at least one link", () => {
            component.removeLink(0);
            fixture.componentInstance.ngOnChanges();
            expect(component.block.hide).toBeFalsy();
        });

        it("receives the block and the owner as inputs", () => {
            expect(component.block.type).toEqual("Block");
            expect(component.owner.name).toEqual("profile-name");
        });

        it("display links stored in block settings", () => {
            fixture.detectChanges();
            expect(all(".link-list-block a").length).toEqual(2);
        });

        it("add a new link", () => {
            component.addLink();
            fixture.detectChanges();
            expect(all(".link-list-block a").length).toEqual(3);
        });

        it("remove a new link", () => {
            component.removeLink(0);
            fixture.detectChanges();
            expect(all(".link-list-block a").length).toEqual(1);
        });

        it("return true when check for a new link by index", () => {
            component.addLink();
            expect(component.isNewLink(2)).toBeTruthy();
        });

        function all(selector: string) {
            let compiled = fixture.debugElement;
            return compiled.queryAll(By.css(selector));
        }
    });

});
