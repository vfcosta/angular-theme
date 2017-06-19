import { BlockService } from './../../../../lib/ng-noosfero-api/http/block.service';
import { TranslatePipe } from './../../../../app/shared/pipes/translate-pipe';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { tick, fakeAsync, async, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsBlockComponent } from './breadcrumbs-block.component';
import * as helpers from "./../../../../spec/helpers";

describe("Components", () => {
    describe("Breadcrumbs Block Component", () => {
        let fixture: ComponentFixture<BreadcrumbsBlockComponent>;
        let component: BreadcrumbsBlockComponent;

        let links: any[] = [{ name: 'link1', url: '/link1' }, { name: 'link2', url: '/link1/link2' }];
        let mockedBlockService = jasmine.createSpyObj("BlockService", ["getApiContent"]);
        mockedBlockService.getApiContent = jasmine.createSpy("getApiContent").and.returnValue(Promise.resolve({ links: links }));
        let state = jasmine.createSpyObj("state", ["go"]);
        let stateParams = {};
        let transitions = jasmine.createSpyObj("$transitions", ["onSuccess"]);

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [BreadcrumbsBlockComponent, TranslatePipe],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                providers: [
                    { provide: BlockService, useValue: mockedBlockService },
                    { provide: "$state", useValue: state },
                    { provide: "$stateParams", useValue: stateParams },
                    { provide: "$transitions", useValue: transitions },
                    { provide: "translatorService", useValue: helpers.mocks.translatorService }
                ]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(BreadcrumbsBlockComponent);
                component = fixture.componentInstance;
                component.owner = <noosfero.Profile>{ id: 1, name: 'profile-name', identifier: 'profile-name' };
                component.block = {};
                component.links = links;
            }).catch( error => {
                console.log(error);
            });
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
