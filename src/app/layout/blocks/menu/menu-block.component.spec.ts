import { TestComponentBuilder } from 'ng-forward/cjs/testing/test-component-builder';
import { provideFilters } from '../../../../spec/helpers';
import { MenuBlockComponent } from './menu-block.component';
import * as helpers from "../../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../../spec/component-test-helper';

const htmlTemplate: string = '<noosfero-menu-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-menu-block>';

describe("Components", () => {

    describe("Menu Block Component", () => {

        let helper: ComponentTestHelper<MenuBlockComponent>;

        beforeEach(() => {
            angular.mock.module("templates");
        });

        beforeEach((done: Function) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [MenuBlockComponent],
                properties: {
                    block: {
                        id: 1,
                        type: 'MenuBlock',
                        api_content: [
                            { "title": "Activities", "controller": "profile", "action": "activities" },
                            { "title": "About", "controller": "profile", "action": "about" },
                            { "title": "Communities", "controller": "memberships", "action": "index" },
                            { "title": "People", "controller": "friends", "action": "index" }
                        ]
                    },
                    owner: { name: 'profile-name' }
                },
                providers: [
                    helpers.createProviderToValue('TranslatorService', helpers.mocks.translatorService)
                ]
            });
            helper = new ComponentTestHelper<MenuBlockComponent>(cls, done);
        });

        it("receives the block and the owner as inputs", () => {
            expect(helper.component.block.type).toEqual("MenuBlock");
            expect(helper.component.owner.name).toEqual("profile-name");
        });

        it("display the default links defined for person profile", () => {
            expect(helper.all(".menu-block a").length).toEqual(2);
        });

        it("make available only url's of controller profile", () => {
            expect(helper.component.hasAvailablePage({ "title": "Activities", "controller": "profile", "action": "activities" })).toBeTruthy();
        });

        it("generate correct url for activities", () => {
            let url = { title: 'blocks.menu.activities', url: 'main.profile.info({profile: ctrl.owner.identifier})' };
            expect(helper.component.makeUrl({ "title": "Activities", "controller": "profile", "action": "activities" })).toEqual(url);
        });

        it("generate correct url for about", () => {
            let url = { title: 'blocks.menu.about', url: 'main.profile.about({profile: ctrl.owner.identifier})' };
            expect(helper.component.makeUrl({ "title": "About", "controller": "profile", "action": "about" })).toEqual(url);
        });

        it("initialize links variable", () => {
            let profileLinks = [
                { title: 'blocks.menu.activities', url: 'main.profile.info({profile: ctrl.owner.identifier})' },
                { title: 'blocks.menu.about', url: 'main.profile.about({profile: ctrl.owner.identifier})' }
            ];
            for (let i = 0; i < helper.component.links.length; i++) {
                expect(helper.component.links[i]).toEqual(jasmine.objectContaining(profileLinks[i]));
            }
        });

        it("hide attribute block is true by default", () => {
            (<any>helper.component.block).api_content = [];
            helper.component.ngOnInit();
            expect(helper.component.block.hide).toBeTruthy();
        });

        it("not render block if config has no url", () => {
            (<any>helper.component.block).api_content = [];
            helper.component.ngOnInit();
            expect(helper.component.block.hide).toBeTruthy();
        });

        it("render block if config has no some url", () => {
            expect(helper.component.block.hide).toBeFalsy();
        });


    });

});
