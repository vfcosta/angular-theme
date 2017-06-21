import { TranslatorService } from './../../shared/services/translator.service';
import { LanguageSelectorComponent } from './language-selector.component';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';

describe("Components", () => {
    describe("Language Selector Component", () => {

        let translatorServiceMock = jasmine.createSpyObj('translatorService', ['currentLanguage', 'changeLanguage']);
        translatorServiceMock.availableLanguages = { "en" : "English", "pt": "Português" };

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [ LanguageSelectorComponent ],
                providers: [
                    { provide: TranslatorService, useValue: translatorServiceMock }
                ]
            }).compileComponents();
        }));

        it('should display language options', () => {
            const fixture = TestBed.createComponent(LanguageSelectorComponent);
            fixture.detectChanges();
            let compiled = fixture.debugElement.nativeElement;
            expect(compiled.querySelectorAll('li.language').length).toEqual(2);
        });

        it("call the translator service when change the language", () => {
            const fixture = TestBed.createComponent(LanguageSelectorComponent);
            fixture.componentInstance.changeLanguage("en");
            expect(translatorServiceMock.changeLanguage).toHaveBeenCalledWith("en");
        });
    });
});
