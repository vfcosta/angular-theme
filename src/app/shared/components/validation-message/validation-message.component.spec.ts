import { TranslatePipe } from './../../pipes/translate-pipe';
import { ValidationMessageComponent } from './validation-message.component';
import { By } from '@angular/platform-browser';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule }   from '@angular/forms';
import * as helpers from "../../../../spec/helpers";

describe("Components", () => {

    describe("Validation Message Component", () => {
        let fixture: ComponentFixture<ValidationMessageComponent>;
        let component: ValidationMessageComponent;
        let mocks = helpers.getMocks();

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule],
                declarations: [ValidationMessageComponent, TranslatePipe],
                providers: [
                    { provide: "translatorService", useValue: mocks.translatorService }
                ]
            });
            fixture = TestBed.createComponent(ValidationMessageComponent);
            component = fixture.componentInstance;
            component.field = jasmine.createSpyObj("field", ["valid", "pristine"]);
        }));

        it("display error message from frontend when it has errors to display", () => {
            fixture.detectChanges();
            component.field = <any>{errors: ['is not valid']};
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css('.field-error')).length).toEqual(1);
        });

        it("get full translation of error message", () => {
            fixture.detectChanges();
            component.field = <any> {};
            component.backendErrors["errors_details"] = [{"error": "blank"}];
            component['translatorService'].hasTranslation = jasmine.createSpy("hasTranslation").and.returnValue(true);
            component['translatorService'].translate = jasmine.createSpy("translate").and.returnValue("Name is required");
            // component.hasBackendErrors = jasmine.createSpy("hasBackendErrors").and.returnValue(true);
            expect(component.getErrors()).toEqual(["Name is required"]);
        });

        it("get translation error code", () => {
            fixture.detectChanges();
            component.field = <any> {};
            component.prefix = "prefix1.prefix2";
            component.backendErrors["errors_details"] = [{"error": "blank"}];
            component['translatorService'].hasTranslation = jasmine.createSpy('hasTranslation').and.callFake(function(myParam) {
                return (myParam !== component.prefix + component.dasherize("blank"));
            });
            component['translatorService'].translate = jasmine.createSpy("translate").and.returnValue("Is required");
            // component.hasBackendErrors = jasmine.createSpy("hasBackendErrors").and.returnValue(true);
            expect(component.getErrors()).toEqual(["Is required"]);
        });

        it("get translated message from Grape API", () => {
            fixture.detectChanges();
            component.field = <any> {name: "identifier"};
            component['translatorService'].hasTranslation = jasmine.createSpy('hasTranslation').and.callFake(function(myParam) {
                return false;
            });
            // component.hasBackendErrors = jasmine.createSpy("hasBackendErrors").and.returnValue(true);
            component.setBackendErrors(
                {"errors_details": {"identifier": [{"error": "blank"}, {"error": "not_available"}]},
                "errors_messages": {"identifier": ["não pode ficar em branco", "não está disponível."]},
                "full_messages": ["Identifier não pode ficar em branco", "Identifier não está disponível."]});
            // Notice the capitalizeFirstLetter() in action
            expect(component.getErrors()).toEqual(['Não pode ficar em branco', 'Não está disponível.']);
        });

    });
});
