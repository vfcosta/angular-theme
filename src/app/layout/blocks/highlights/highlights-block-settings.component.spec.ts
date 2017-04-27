import { DragulaModule } from 'ng2-dragula';
import { TranslatePipe } from './../../../shared/pipes/translate-pipe';
import { HighlightsBlockSettingsComponent } from './highlights-block-settings.component';
import * as helpers from "../../../../spec/helpers";
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, Injector } from '@angular/core';
import { BlockSettingsComponent } from '../block-settings.component';

describe("Highlights Block Settings Component", () => {

    let expectedData = "iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAgAElEQ…Cm2OLHvfdNPte3zrH709Q0esN1LPQ0t7DL696ERpu+9/8BVPLIpElf7VYAAAAASUVORK5CYII=";
    let testDataUrl = "data:image/png;base64," + expectedData;
    let upload = jasmine.createSpyObj("Upload", ["dataUrl"]);
    let mocks = helpers.getMocks();
    let fixture: ComponentFixture<HighlightsBlockSettingsComponent>;
    let component: HighlightsBlockSettingsComponent;

    beforeEach(async(() => {
        spyOn(mocks.blockService, 'uploadImages').and.returnValue(Promise.resolve({data: { images: []}}));
        let blockSettingsComponent = { block: {}, owner: {} };

        TestBed.configureTestingModule({
            declarations: [HighlightsBlockSettingsComponent, TranslatePipe],
            providers: [
                { provide: "blockService", useValue: mocks.blockService },
                { provide: Injector, useValue: mocks.injector },
                { provide: "translatorService", useValue: mocks.translatorService },
                { provide: BlockSettingsComponent, useValue: blockSettingsComponent },
            ],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [DragulaModule]
        });
        fixture = TestBed.createComponent(HighlightsBlockSettingsComponent);
        component = fixture.componentInstance;
        component.parentBlock.block = <any>{
            id: 1,
            settings: { interval: 2, shuffle: true },
            api_content: { slides: [{ image_src: "image.png" }] }
        };
    }));

    it("display block settings", () => {
        expect(fixture.debugElement.queryAll(By.css(".highlights-block-settings")).length).toEqual(1);
    });

    it("add an empty slide", () => {
        fixture.detectChanges();
        component.addSlide();
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css(".highlights-block-settings .slide .thumbnail img")).length).toEqual(2);
    });

    it("remove slide", () => {
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css(".highlights-block-settings .slide .thumbnail img")).length).toEqual(1);
        component.removeSlide(0);
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css(".highlights-block-settings .slide .thumbnail img")).length).toEqual(0);
    });

    it("update active slide on selection", () => {
        component.selectSlide(1);
        expect((<any>component.parentBlock.block).active).toEqual(1);
    });

    it("default to empty array when there is no block images", () => {
        component.parentBlock.block.api_content = { slides: null };
        component.ngOnInit();
        expect(component.images).toEqual([]);
    });

    it("do nothing when no file was selected", () => {
        component.upload(null, null);
        expect(upload.dataUrl).not.toHaveBeenCalled();
    });

    it("upload image when a file was selected", () => {
        component['blockService'].uploadImages = jasmine.createSpy("uploadImages").and.returnValue(helpers.mocks.promiseResultTemplate({ data: { images: [{ id: 10, url: "url" }] } }));
        component.upload(testDataUrl, {});
        expect(component['blockService'].uploadImages).toHaveBeenCalled();
    });
});
