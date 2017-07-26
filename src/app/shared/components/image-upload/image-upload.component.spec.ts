import { TranslateModule } from '@ngx-translate/core';
import { TranslatorService } from './../../services/translator.service';
import { By } from '@angular/platform-browser';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';
import { ImageUploadComponent } from './image-upload.component';

describe("Components", () => {

    describe("Profile Image Editor Component", () => {

        let fixture: ComponentFixture<ImageUploadComponent>;
        let component: ImageUploadComponent;

        const expectedData = "iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAgAElEQ…Cm2OLHvfdNPte3zrH709Q0esN1LPQ0t7DL696ERpu+9/8BVPLIpElf7VYAAAAASUVORK5CYII=";
        const testDataUrl = "data:image/png;base64," + expectedData;

        const translatorService = jasmine.createSpyObj("translatorService", ["translate"]);

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [ ImageUploadComponent ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                imports: [ModalModule.forRoot(), TranslateModule.forRoot()],
                providers: [
                    { provide: TranslatorService, useValue: translatorService },
                ]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(ImageUploadComponent);
                component = fixture.componentInstance;
            });
        }));

        it("get data", () => {
            const result = component.getBase64ImageJson(testDataUrl, "test.png");
            expect(result.tempfile).toBe(expectedData);
        });

        it("emit output when finish with image", () => {
            component.finished = jasmine.createSpyObj("finished", ["emit"]);
            component.data = {image: expectedData};
            component.finish();
            expect(component.finished.emit).toHaveBeenCalled();
        });

        it("not emit output when finish without image", () => {
            component.finished = jasmine.createSpyObj("finished", ["emit"]);
            component.data = {image: null};
            component.finish();
            expect(component.finished.emit).not.toHaveBeenCalled();
        });

        it("display image upload input when crop is not enabled", () => {
            component.cropEnabled = false;
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css(".image-upload-without-crop .image-upload-input")).length).toEqual(1);
        });
    });
});
