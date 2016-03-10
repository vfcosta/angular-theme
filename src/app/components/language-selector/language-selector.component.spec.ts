import {TestComponentBuilder, ComponentFixture} from 'ng-forward/cjs/testing/test-component-builder';
import {Pipe, Input, provide, Component} from 'ng-forward';

import {LanguageSelector} from './language-selector.component';

import * as helpers from "../../../spec/helpers";

const tcb = new TestComponentBuilder();

const htmlTemplate: string = '<language-selector></language-selector>';

describe("Components", () => {

    describe("Language Selector Component", () => {

        beforeEach(angular.mock.module("templates"));

        @Component({
            selector: 'test-container-component',
            template: htmlTemplate,
            directives: [LanguageSelector],
            providers: [
                provide('$translate', {
                    useValue: helpers.mocks.$translate
                })
            ].concat(helpers.provideFilters("translateFilter"))
        })
        class BlockContainerComponent { }

        it("set available languages when change language", () => {
            let component: LanguageSelector = new LanguageSelector(<any>helpers.mocks.$translate);
            component.availableLanguages = null;
            expect(component.availableLanguages).toBeNull();
            component.changeLanguage('en');
            expect(component.availableLanguages).toBeDefined();
        });

        it("display language options", () => {
            helpers.createComponentFromClass(BlockContainerComponent).then(fixture => {
                expect(fixture.debugElement.queryAll('li.language').length).toEqual(2);
            });
        });

    });
});
