import { Component } from 'ng-forward';
import { BlockEditionComponent } from './block-edition.component';
import * as helpers from "../../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../../spec/component-test-helper';

const htmlTemplate: string = '<noosfero-block-edition [block]="ctrl.block"></noosfero-block-edition>';

describe("Block Edition Component", () => {

    let helper: ComponentTestHelper<BlockEditionComponent>;

    beforeEach(() => {
        angular.mock.module("templates");
    });

    let blocksSavedFn: Function;
    let eventsHubService = jasmine.createSpyObj("eventsHubService", ["subscribeToEvent", "emitEvent"]);
    eventsHubService.subscribeToEvent = (event: string, fn: Function) => {
        blocksSavedFn = fn;
    };

    beforeEach((done) => {
        let cls = createClass({
            template: htmlTemplate,
            directives: [BlockEditionComponent],
            properties: { block: { id: 1, settings: <any>{} } },
            providers: [
                helpers.createProviderToValue('EventsHubService', eventsHubService),
            ]
        });
        helper = new ComponentTestHelper<BlockEditionComponent>(cls, done);
    });

    it("return true for first option when setting is null", () => {
        expect(helper.component.isOptionSelected("display", "always")).toBeTruthy();
    });

    it("return false for other options when setting is null", () => {
        expect(helper.component.isOptionSelected("display", "home_page_only")).toBeFalsy();
    });

    it("change block setting when select an option", () => {
        helper.component.selectOption("display", "never");
        expect(helper.component.isOptionSelected("display", "never")).toBeTruthy();
    });

    it("emit change event when an attribute was modified", () => {
        helper.component.block.title = "changed";
        helper.component.emitChanges();
        expect(eventsHubService.emitEvent).toHaveBeenCalledWith('BLOCK_CHANGED', { id: 1, title: "changed" });
    });

    it("emit change event with block id when no attribute was modified", () => {
        helper.component.emitChanges();
        expect(eventsHubService.emitEvent).toHaveBeenCalledWith('BLOCK_CHANGED', { id: 1 });
    });

    it("emit change event when an setting attribute was modified", () => {
        (<any>helper.component.block.settings).display = "never";
        helper.component.emitChanges();
        expect(eventsHubService.emitEvent).toHaveBeenCalledWith('BLOCK_CHANGED', { id: 1, display: "never" });
    });

    it("emit change event with block id when an setting attribute was not modified", () => {
        (<any>helper.component.originalBlock.settings).display = "never";
        (<any>helper.component.block.settings).display = "never";
        helper.component.emitChanges();
        expect(eventsHubService.emitEvent).toHaveBeenCalledWith('BLOCK_CHANGED', { id: 1 });
    });

    it("update originalBlock when receive a BLOCKS_SAVED event", () => {
        (<any>helper.component.block.settings).display = "never";
        blocksSavedFn();
        expect((<any>helper.component.originalBlock.settings).display).toBe("never");
    });
});
