import { tick, fakeAsync, async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Input, Component } from '@angular/core';

import { BlockSettingsComponent } from './block-settings.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';


const htmlTemplate: string = '<noosfero-block-settings [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-block-settings>';

fdescribe("Components", () => {
    describe("Block Component", () => {

        it("receives the block and the owner as inputs", () => {
            // Creating a container component (BlockContainerComponent) to include
            // the component under test (Block)
            @Component({ selector: 'test-container-component', template: htmlTemplate })
            class BlockContainerComponent {
                block = { type: 'Block' };
                owner = { name: 'profile-name' };
                constructor() {
                }
            }

            let fixture: ComponentFixture<BlockContainerComponent>;
            let component: BlockContainerComponent;

            TestBed.configureTestingModule({
                declarations: [BlockContainerComponent],
                providers: [],
                schemas: [NO_ERRORS_SCHEMA],
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(BlockContainerComponent);
                component = fixture.componentInstance;
                expect(component.block.type).toEqual("Block");
                expect(component.owner.name).toEqual("profile-name");
            });
        });

        it("renders a component which matches to the block type", () => {
            @Component({ selector: 'noosfero-custom-block-settings', template: "<h1>My Custom Block</h1>" })
            class CustomBlockSettings {
                @Input() block: any;
                @Input() owner: any;
            }

            @Component({ selector: 'test-container-component', template: htmlTemplate })
            class CustomBlockType {
                block = { type: 'CustomBlock' };
                owner = { name: 'profile-name' };
                constructor() {
                }
            }

            let fixture: ComponentFixture<CustomBlockType>;
            let component: CustomBlockType;

            TestBed.configureTestingModule({
                declarations: [CustomBlockType],
                providers: [],
                schemas: [NO_ERRORS_SCHEMA],
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(CustomBlockType);
                component = fixture.componentInstance;
                expect(component.block.type).toEqual("CustomBlock");
                expect(fixture.debugElement.children[0].attributes['text']).toEqual("My Custom Block");
            });
        });

        it("renders the default block when hasn't defined a block type", () => {
            @Component({ selector: 'test-container-component', template: htmlTemplate })
            class CustomBlockType {
                block: any = { type: null };
                owner: any = { name: 'profile-name' };
                constructor() {
                }
            }

            let fixture: ComponentFixture<CustomBlockType>;
            let component: CustomBlockType;

            TestBed.configureTestingModule({
                declarations: [CustomBlockType],
                providers: [],
                schemas: [NO_ERRORS_SCHEMA],
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(CustomBlockType);
                component = fixture.componentInstance;
                expect(component.block.type).toBeNull();
                expect(!!fixture.debugElement.nativeElement.querySelector("noosfero-default-block-settings")).toBeTruthy();
            });
        });

    });
});
