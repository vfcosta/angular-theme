import { TranslateModule } from '@ngx-translate/core';
import { TranslatorService } from './../../../shared/services/translator.service';
import { EnvironmentService } from './../../../../lib/ng-noosfero-api/http/environment.service';
import { ProfileService } from './../../../../lib/ng-noosfero-api/http/profile.service';
import { SettingsService } from './../../../../lib/ng-noosfero-api/http/settings.service';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { NgPipesModule } from 'ngx-pipes';
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
                declarations: [AddBlockComponent],
                providers: [
                    { provide: SettingsService, useValue: mocks.settingsService },
                    { provide: ProfileService, useValue: mocks.profileService },
                    { provide: EnvironmentService, useValue: mocks.environmentService },
                    { provide: TranslatorService, useValue: mocks.translatorService }
                ],
                schemas: [NO_ERRORS_SCHEMA],
                imports: [NgPipesModule, ModalModule.forRoot(), FormsModule, TranslateModule.forRoot()]
            });
            fixture = TestBed.createComponent(AddBlockComponent);
            component = fixture.componentInstance;
        }));

        it("load available blocks", () => {
            component.loadAvailableBlocks();
            expect(TestBed.get(SettingsService).getAvailableBlocks).toHaveBeenCalled();
        });

        it("emit event when add block", fakeAsync(() => {
            spyOn(component.onAdd, 'emit');
            TestBed.get(ProfileService).getBlockTemplate = jasmine.createSpy('createAccount').and.returnValue(Promise.resolve({data: { api_content: [] }}));
            component.owner = <any>{id: 54};
            component.addBlock(<noosfero.Block>{ type: 'RecentDocumentsBlock'});
            tick();
            expect(TestBed.get(ProfileService).getBlockTemplate).toHaveBeenCalledWith(component.owner.id, 'RecentDocumentsBlock');
            expect(component.onAdd.emit).toHaveBeenCalled();
        }));

        it("filter blocks by whitelist when load available blocks", fakeAsync(() => {
            TestBed.get(SettingsService).getAvailableBlocks = jasmine.createSpy("getAvailableBlocks").and.returnValue(Promise.resolve({
                data: [
                    {type: 'RawHTMLBlock'},
                    {type: 'OtherInvalidBlock'},
                ]
            }));
            component.loadAvailableBlocks();
            tick();
            expect(component.blocks.length).toEqual(1);
        }));
    });
});
