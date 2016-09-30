import { Provider, Input, provide, Component } from 'ng-forward';
import { provideFilters } from '../../../../spec/helpers';
import { BreadcrumbsBlockComponent } from './breadcrumbs-block.component';
import { ComponentTestHelper, createClass } from './../../../../spec/component-test-helper';
import * as helpers from "./../../../../spec/helpers";

const htmlTemplate: string = '<noosfero-breadcrumbs-plugin-content-breadcrumbs-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-breadcrumbs-plugin-content-breadcrumbs-block>';

describe("Components", () => {
    describe("Breadcrumbs Block Component", () => {

        let helper: ComponentTestHelper<BreadcrumbsBlockComponent>;
        let links: any[] = [{ name: 'link1', url: '/link1' }, { name: 'link2', url: '/link1/link2' }];
        let mockedBlockService = jasmine.createSpyObj("BlockService", ["getApiContent"]);
        mockedBlockService.getApiContent = jasmine.createSpy("getApiContent").and.returnValue(Promise.resolve({ links: links }));
        let state = jasmine.createSpyObj("state", ["go"]);
        let stateParams = {};

        let providers = [
            new Provider('$state', { useValue: state }),
            new Provider('$stateParams', { useValue: stateParams }),
            new Provider('$scope', { useValue: helpers.mocks.scopeWithEvents }),
            new Provider('BlockService', {
                useValue: mockedBlockService
            })
        ];

        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [BreadcrumbsBlockComponent],
                providers: providers,
                properties: { block: {} }
            });
            helper = new ComponentTestHelper<BreadcrumbsBlockComponent>(cls, done);
        });

        it("call api to get links when set navigation state", () => {
            let component = helper.component;
            component.setNavigationState();
            expect(mockedBlockService.getApiContent).toHaveBeenCalled();
            expect(component.links[0]['name']).toEqual('link1');
            expect(component.links[1]['name']).toEqual('link2');
        });

        it("set the last link as active", () => {
            let component = helper.component;
            component.setNavigationState();
            expect(component.links[1]['active']).toBeTruthy();
        });
    });
});
