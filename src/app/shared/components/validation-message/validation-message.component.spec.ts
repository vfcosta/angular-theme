import { TranslateModule } from '@ngx-translate/core';
import { TranslatorService } from './../../services/translator.service';
import { ValidationMessageComponent } from './validation-message.component';
import { By } from '@angular/platform-browser';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule, FormControl } from '@angular/forms';
import * as helpers from "../../../../spec/helpers";
import { fixtures } from '../../../../spec/helpers';
import { Component, ViewChild, ElementRef, Pipe, PipeTransform } from '@angular/core';


@Component({
    selector: "form-template-test",
    template: `<form class="form" (ngSubmit)="save($event)" #profileForm="ngForm" novalidate>
                    <input type="password" required #currentPasswordInput #currentPassword="ngModel" id="current_password"  name="current_password" [(ngModel)]="current_password">
                    <validation-message #currentPasswordValidation [field]="currentPassword" [prefix]=""></validation-message>
                </form>
`
})
class FormTemplateTestComponet {
    @ViewChild('currentPasswordValidation') currentPasswordValidation: ValidationMessageComponent;
    @ViewChild('currentPasswordInput') currentPassword: ElementRef;
}

let translatedText = "";
@Pipe({name: 'translate'})
class MockTranslationPipe implements PipeTransform {
    transform(value: string): string {
        return translatedText;
    }
}

describe("Components", () => {
    describe("Validation Message Component", () => {
        let fixture: ComponentFixture<ValidationMessageComponent>;
        let formFixture: ComponentFixture<FormTemplateTestComponet>;
        let component: ValidationMessageComponent;
        let formComponent: FormTemplateTestComponet;
        let mocks = helpers.getMocks();

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule],
                declarations: [ValidationMessageComponent, FormTemplateTestComponet, MockTranslationPipe],
                providers: [
                    { provide: TranslatorService, useValue: mocks.translatorService }
                ]
            });
            fixture = TestBed.createComponent(ValidationMessageComponent);
            component = fixture.componentInstance;
            component.field = jasmine.createSpyObj("field", ["valid", "pristine"]);
            component.field.update = jasmine.createSpyObj("update", ["subscribe"]);
            formFixture = TestBed.createComponent(FormTemplateTestComponet);
            formComponent = formFixture.componentInstance;
        }));

        it("get full translation of error message", () => {
            formFixture.detectChanges();
            formComponent.currentPasswordValidation.setBackendErrors({ errors: { current_password: [{ error: 'blank', full_message: 'cant be blank' }] } });
            translatedText = "Name is required";
            formFixture.detectChanges();
            expect(formFixture.debugElement.nativeElement.querySelector(".field-error").innerHTML).toContain('Name is required');
        });

        it("get translation error code", () => {
            formFixture.detectChanges();

            formComponent.currentPasswordValidation.prefix = "prefix1.prefix2";
            formComponent.currentPasswordValidation['translatorService'].hasTranslation = jasmine.createSpy('hasTranslation').and.callFake(function (myParam) {
                return (myParam === 'blank');
            });
            formComponent.currentPasswordValidation.setBackendErrors({ errors: { current_password: [{ error: 'blank', full_message: 'cant be blank' }] } });
            expect(formComponent.currentPasswordValidation.getErrors()).toEqual(["blank"]);
        });

        it("get translated message from Grape API", () => {
            formFixture.detectChanges();
            formComponent.currentPasswordValidation['translatorService'].hasTranslation = jasmine.createSpy('hasTranslation').and.callFake(function (myParam) {
                return false;
            });
            formComponent.currentPasswordValidation.setBackendErrors(
                {
                    errors: {
                        current_password: [
                            { error: "blank" , full_message: "Não pode ficar em branco" },
                            { error: "not_available", full_message: "Não está disponível." }
                        ]
                    }
                });
            formFixture.detectChanges();
            expect(formComponent.currentPasswordValidation.getErrors()).toEqual(['Não pode ficar em branco', 'Não está disponível.']);
        });

    });
});
