import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { PopoverModule } from 'ngx-bootstrap';
import { TranslatePipe } from './../../../shared/pipes/translate-pipe';
import { BlockEditionComponent } from './block-edition.component';
import * as helpers from "../../../../spec/helpers";

describe("Components", () => {

    describe("Block Edition Component", () => {

        let scope = {};
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<BlockEditionComponent>;
        let component: BlockEditionComponent;
        let blocksSavedFn: Function;
        mocks.eventsHubService.subscribeToEvent = <any>((event: string, fn: Function) => {
            blocksSavedFn = fn;
        });

        beforeEach(async(() => {
            spyOn(mocks.eventsHubService, "emitEvent");
            TestBed.configureTestingModule({
                imports: [PopoverModule.forRoot()],
                declarations: [BlockEditionComponent, TranslatePipe],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    { provide: "$scope", useValue: mocks.scopeWithEvents() },
                    { provide: "eventsHubService", useValue: mocks.eventsHubService },
                ]
            });

            fixture = TestBed.createComponent(BlockEditionComponent);
            component = fixture.componentInstance;
            component.owner = <noosfero.Profile>{ id: 1, name: 'profile-name', identifier: 'profile-name' };
            component.block = <noosfero.Block>{ id: 1, settings: <any>{} };

            fixture.detectChanges();
        }));

        it("return true for first option when setting is null", () => {
            expect(component.isOptionSelected("display", "always")).toBeTruthy();
        });

        it("return false for other options when setting is null", () => {
            expect(component.isOptionSelected("display", "home_page_only")).toBeFalsy();
        });

        it("change block setting when select an option", () => {
            component.selectOption("display", "never");
            expect(component.isOptionSelected("display", "never")).toBeTruthy();
        });

        it("emit change event when an attribute was modified", () => {
            component.block.title = "changed";
            component.emitChanges();
            expect(mocks.eventsHubService.emitEvent).toHaveBeenCalledWith('BLOCK_CHANGED', { id: 1, title: "changed", api_content: { } });
        });

        it("emit change event with block id when no attribute was modified", () => {
            component.emitChanges();
            expect(mocks.eventsHubService.emitEvent).toHaveBeenCalledWith('BLOCK_CHANGED', { id: 1, api_content: { } });
        });

        it("emit change event when an setting attribute was modified", () => {
            (<any>component.block.settings).display = "never";
            component.emitChanges();
            expect(mocks.eventsHubService.emitEvent).toHaveBeenCalledWith('BLOCK_CHANGED', { id: 1, display: "never", api_content: { } });
        });

        it("emit change event with block id when an setting attribute was not modified", () => {
            (<any>component.originalBlock.settings).display = "never";
            (<any>component.block.settings).display = "never";
            component.emitChanges();
            expect(mocks.eventsHubService.emitEvent).toHaveBeenCalledWith('BLOCK_CHANGED', { id: 1, api_content: { } });
        });

        it("update originalBlock when receive a BLOCKS_SAVED event", () => {
            (<any>component.block.settings).display = "never";
            blocksSavedFn();
            expect((<any>component.originalBlock.settings).display).toBe("never");
        });
    });

});