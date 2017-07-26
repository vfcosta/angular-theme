import { By } from '@angular/platform-browser';
import { BlockService } from './../../../lib/ng-noosfero-api/http/block.service';
import { TranslatorService } from './../../shared/services/translator.service';
import * as helpers from '../../../spec/helpers';
import { TranslateModule } from '@ngx-translate/core';
import { HighlightsBlockComponent } from './highlights/highlights-block.component';
import { HighlightsBlockSettingsComponent } from './highlights/highlights-block-settings.component';
import { BlockSettingsComponent } from './block-settings.component';
import { tick, fakeAsync, async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Input, Component } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const htmlTemplate = '<noosfero-block-settings [block]="block" [owner]="owner"></noosfero-block-settings>';

describe("Components", () => {
    describe("Block Settings Component", () => {
        const mocks = helpers.getMocks();

        it("receives the block and the owner as inputs", () => {
            // Creating a container component (BlockContainerComponent) to include
            // the component under test (Block)
            @Component({ selector: 'test-container-component', template: htmlTemplate })
            class BlockContainerComponent {
                block = { type: 'Block' };
                owner = { name: 'profile-name' };
            }

            let fixture: ComponentFixture<BlockContainerComponent>;
            let component: BlockContainerComponent;

            TestBed.configureTestingModule({
                declarations: [BlockContainerComponent],
                providers: [],
                schemas: [NO_ERRORS_SCHEMA],
            });
            fixture = TestBed.createComponent(BlockContainerComponent);
            component = fixture.componentInstance;
            expect(component.block.type).toEqual("Block");
            expect(component.owner.name).toEqual("profile-name");
        });

        it("renders a component which matches to the block type", fakeAsync(() => {
            @Component({ selector: 'test-container-component', template: htmlTemplate })
            class CustomBlockTypeComponent {
                block = { type: 'HighlightsBlock', settings: { interval: 1 } };
                owner = { name: 'profile-name' };
            }
            let fixture: ComponentFixture<CustomBlockTypeComponent>;
            let component: CustomBlockTypeComponent;

            TestBed.configureTestingModule({
                declarations: [CustomBlockTypeComponent, BlockSettingsComponent],
                imports: [TranslateModule.forRoot()],
                providers: [
                    { provide: BlockService, useValue: mocks.blockService },
                ],
                schemas: [NO_ERRORS_SCHEMA],
            });
            fixture = TestBed.createComponent(CustomBlockTypeComponent);
            component = fixture.componentInstance;
            tick();
            fixture.detectChanges();
            expect(component.block.type).toEqual("HighlightsBlock");
            expect(fixture.debugElement.queryAll(By.css('noosfero-highlights-block-settings')).length).toEqual(1);
        }));

        it("renders nothing when block type is not defined", () => {
            @Component({ selector: 'test-container-component', template: htmlTemplate })
            class CustomBlockTypeComponent {
                block: any = { type: null };
                owner: any = { name: 'profile-name' };
                constructor() {
                }
            }

            let fixture: ComponentFixture<CustomBlockTypeComponent>;
            let component: CustomBlockTypeComponent;

            TestBed.configureTestingModule({
                declarations: [CustomBlockTypeComponent],
                providers: [],
                schemas: [NO_ERRORS_SCHEMA],
            });
            fixture = TestBed.createComponent(CustomBlockTypeComponent);
            component = fixture.componentInstance;
            expect(component.block.type).toBeNull();
            expect(fixture.debugElement.query(By.css('noosfero-block-settings')).nativeElement.innerHTML).toEqual("");
        });
    });
});
