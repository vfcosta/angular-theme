import { TranslatorService } from './../../services/translator.service';
import { async, TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { EditableLinkComponent } from './editable-link.component';
import { TranslatePipe } from './../../../shared/pipes/translate-pipe';
import { NoosferoTemplatePipe } from './../../../shared/pipes/noosfero-template.ng2.filter';
import { PopoverModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import * as helpers from "../../../../spec/helpers";
import { EventEmitter } from '@angular/core';

describe("Components", () => {

    describe("Editable Link Component", () => {

        let fixture: ComponentFixture<EditableLinkComponent>;
        let component: EditableLinkComponent;

        let linkChange = jasmine.createSpyObj("linkChange", ["emit"]);
        linkChange.emit = jasmine.createSpy("emit");

        beforeEach(async(() => {

            TestBed.configureTestingModule({
                imports: [PopoverModule.forRoot(), FormsModule],
                declarations: [EditableLinkComponent, TranslatePipe, NoosferoTemplatePipe],
                providers: [{ provide: TranslatorService, useValue: helpers.mocks.translatorService }]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(EditableLinkComponent);
                component = fixture.componentInstance;
                component.name = 'link';
                component.address = 'address';
                component.designMode = true;
                let popOver = { hide: () => { } };
                component.popover = popOver;
                component.linkChange = linkChange;
            });
        }));

        it("copy link content on init", () => {
            fixture.detectChanges();
            expect(component.modifiedLink).toEqual({ name: 'link', address: 'address' });
        });

        it("copy link content when save", () => {
            component.modifiedLink = { name: "modified name", address: "modified address" };
            component.save();
            expect(component.linkChange.emit).toHaveBeenCalled();
        });

    });

});
