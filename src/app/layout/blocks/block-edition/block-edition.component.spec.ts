import {Component} from 'ng-forward';
import {BlockEditionComponent} from './block-edition.component';
import * as helpers from "../../../../spec/helpers";
import {ComponentTestHelper, createClass} from '../../../../spec/component-test-helper';

const htmlTemplate: string = '<noosfero-block-edition></noosfero-block-edition>';

describe("Boxes Component", () => {

    let helper: ComponentTestHelper<BlockEditionComponent>;
    let translatorService = {
        availableLanguages: { 'en': 'English', 'pt': 'Portuguese' }
    };

    beforeEach(() => {
        angular.mock.module("templates");
    });

    beforeEach((done) => {
        let cls = createClass({
            template: htmlTemplate,
            directives: [BlockEditionComponent],
            providers: [
                helpers.createProviderToValue('TranslatorService', translatorService)
            ]
        });
        helper = new ComponentTestHelper<BlockEditionComponent>(cls, done);
    });

    it("get available languages from translator service", () => {
        expect(helper.component.languageOptions).toEqual(['all', 'en', 'pt']);
    });

});
