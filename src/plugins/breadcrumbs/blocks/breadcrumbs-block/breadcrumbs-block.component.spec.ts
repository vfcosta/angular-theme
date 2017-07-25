import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslatorService } from './../../../../app/shared/services/translator.service';
import { BlockService } from './../../../../lib/ng-noosfero-api/http/block.service';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { tick, fakeAsync, async, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsBlockComponent } from './breadcrumbs-block.component';
import * as helpers from './../../../../spec/helpers';

describe("Components", () => {
    describe("Breadcrumbs Block Component", () => {
        let fixture: ComponentFixture<BreadcrumbsBlockComponent>;
        let component: BreadcrumbsBlockComponent;

        const links: any[] = [{ name: 'link1', url: '/link1' }, { name: 'link2', url: '/link1/link2' }];
        const mockedBlockService = jasmine.createSpyObj("BlockService", ["getApiContent"]);
        mockedBlockService.getApiContent = jasmine.createSpy("getApiContent").and.returnValue(Promise.resolve({ links: links }));
        const state = jasmine.createSpyObj("state", ["go"]);
        const stateParams = {};
        const transitions = jasmine.createSpyObj("$transitions", ["onSuccess"]);
        const mocks = helpers.getMocks();

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [BreadcrumbsBlockComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                providers: [
                    { provide: BlockService, useValue: mockedBlockService },
                    { provide: "Window", useValue: mocks.window },
                    { provide: TranslatorService, useValue: mocks.translatorService },
                ],
                imports: [RouterTestingModule]
            });
            fixture = TestBed.createComponent(BreadcrumbsBlockComponent);
            component = fixture.componentInstance;
            component.owner = <noosfero.Profile>{ id: 1, name: 'profile-name', identifier: 'profile-name' };
            component.block = {};
            component.links = links;
        }));

        it("call api to get links when set navigation state", () => {
            component.setNavigationState();
            expect(mockedBlockService.getApiContent).toHaveBeenCalled();
            expect(component.links[0]['name']).toEqual('link1');
            expect(component.links[1]['name']).toEqual('link2');
        });

        it("set the last link as active", () => {
            component.setNavigationState();
            expect(component.links[1]['active']).toBeTruthy();
        });
    });
});
