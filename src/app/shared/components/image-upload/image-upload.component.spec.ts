import { TranslatePipe } from './../../pipes/translate-pipe';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ModalModule } from 'ng2-bootstrap';
import { ImageUploadComponent } from "./image-upload.component";

describe("Components", () => {

    describe("Profile Image Editor Component", () => {

        let fixture: ComponentFixture<ImageUploadComponent>;
        let component: ImageUploadComponent;

        let expectedData = "iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAgAElEQ…Cm2OLHvfdNPte3zrH709Q0esN1LPQ0t7DL696ERpu+9/8BVPLIpElf7VYAAAAASUVORK5CYII=";
        let testDataUrl = "data:image/png;base64," + expectedData;

        let translatorService = jasmine.createSpyObj("translatorService", ["translate"]);

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [ ImageUploadComponent, TranslatePipe ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                imports: [ModalModule.forRoot()],
                providers: [
                    { provide: "translatorService", useValue: translatorService },
                ]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(ImageUploadComponent);
                component = fixture.componentInstance;
            });
        }));

        it("get data", () => {
            let result = component.getBase64ImageJson(testDataUrl, "test.png");
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
    });
});
