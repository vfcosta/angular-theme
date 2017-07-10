import { TranslateModule } from '@ngx-translate/core';
import { TranslatorService } from './../../services/translator.service';
import { async, TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { EditableFieldComponent } from './editable-field.component';
import { NoosferoTemplatePipe } from './../../../shared/pipes/noosfero-template.ng2.filter';
import { PopoverModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import * as helpers from '../../../../spec/helpers';
import { EventEmitter } from '@angular/core';

describe("Components", () => {
    describe("Editable Link Component", () => {

        let fixture: ComponentFixture<EditableFieldComponent>;
        let component: EditableFieldComponent;

        let textChange = jasmine.createSpyObj("textChange", ["emit"]);
        textChange.emit = jasmine.createSpy("emit");

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PopoverModule.forRoot(), FormsModule, TranslateModule.forRoot()],
                declarations: [EditableFieldComponent, NoosferoTemplatePipe],
                providers: [{ provide: TranslatorService, useValue: helpers.mocks.translatorService }]
            });
            fixture = TestBed.createComponent(EditableFieldComponent);
            component = fixture.componentInstance;
            component.text = 'link';
            component.designMode = true;
            let popOver = { hide: () => { } };
            component.popover = popOver;
            component.textChange = textChange;
        }));

        it("copy text content on init", () => {
            fixture.detectChanges();
            expect(component.modifiedText).toEqual('link');
        });

        it("copy text content when save", () => {
            component.modifiedText = "modified text";
            component.save();
            expect(component.textChange.emit).toHaveBeenCalled();
        });

    });

});
