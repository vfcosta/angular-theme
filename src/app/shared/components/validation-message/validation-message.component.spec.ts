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

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule],
                declarations: [ValidationMessageComponent, TranslatePipe],
                providers: [
                    { provide: "translatorService", useValue: helpers.mocks.translatorService }
                ]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(ValidationMessageComponent);
                component = fixture.componentInstance;
                component.field = jasmine.createSpyObj("field", ["valid", "pristine"]);
            });
        }));

        it("display error message when it has errors to display", () => {
            fixture.detectChanges();
            component.field = <any>{errors: ['is not valid']};
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css('.field-error')).length).toEqual(1);
        });
    });
});
