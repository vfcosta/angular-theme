import { ModalModule } from 'ngx-bootstrap';
import { NgPipesModule } from 'ngx-pipes';
import { TranslatePipe } from './../../../shared/pipes/translate-pipe';
import { AddBlockComponent } from './add-block.component';
import * as helpers from "../../../../spec/helpers";
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe("Components", () => {
    describe("Add Block Component", () => {
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<AddBlockComponent>;
        let component: AddBlockComponent;

        beforeEach(async(() => {
            spyOn(mocks.settingsService, 'getAvailableBlocks').and.returnValue(Promise.resolve({data: []}));
            TestBed.configureTestingModule({
                declarations: [AddBlockComponent, TranslatePipe],
                providers: [
                    { provide: "settingsService", useValue: mocks.settingsService },
                    { provide: "translatorService", useValue: mocks.translatorService }
                ],
                schemas: [NO_ERRORS_SCHEMA],
                imports: [NgPipesModule, ModalModule.forRoot()]
            });
            fixture = TestBed.createComponent(AddBlockComponent);
            component = fixture.componentInstance;
        }));

        it("load available blocks", () => {
            component.loadAvailableBlocks();
            expect(TestBed.get('settingsService').getAvailableBlocks).toHaveBeenCalled();
        });

        it("emit event when add block", () => {
            spyOn(component.onAdd, 'emit');
            component.addBlock(<noosfero.Block>{});
            expect(component.onAdd.emit).toHaveBeenCalled();
        });
    });
});
