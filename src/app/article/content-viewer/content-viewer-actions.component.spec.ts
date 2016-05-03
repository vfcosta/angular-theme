import {Input, Component, provide} from 'ng-forward';

import * as helpers from "../../../spec/helpers";
import {ComponentTestHelper, createClass} from '../../../spec/component-test-helper';
import {ContentViewerActionsComponent} from './content-viewer-actions.component';

// this htmlTemplate will be re-used between the container components in this spec file
const htmlTemplate: string = '<content-viewer-actions [article]="ctrl.article" [profile]="ctrl.profile"></content-viewer-actions>';

describe('Content Viewer Actions Component', () => {

    let helper: ComponentTestHelper<ContentViewerActionsComponent>;

    beforeEach(angular.mock.module("templates"));

    let providers = [
        provide('ProfileService', {
            useValue: helpers.mocks.profileService
        }),
        provide('ArticleService', {
            useValue: helpers.mocks.articleService
        })
    ].concat(helpers.provideFilters("translateFilter"));

    beforeEach((done) => {
        let cls = createClass({
            template: htmlTemplate,
            directives: [ContentViewerActionsComponent],
            providers: providers
        });
        helper = new ComponentTestHelper<ContentViewerActionsComponent>(cls, done);
    });

    it('renders content viewer actions directive', () => {
        expect(helper.all("content-viewer-actions").length).toEqual(1);
    });

    it('return article parent as container when it is not a folder', () => {
        let article = <noosfero.Article>({ id: 1, type: 'TextArticle', parent: { id: 2 } });
        expect(helper.component.getArticleContainer(article)).toEqual(2);
    });

    it('return article as container when it is a folder', () => {
        let article = <noosfero.Article>({ id: 1, type: 'Folder' });
        expect(helper.component.getArticleContainer(article)).toEqual(1);
    });

    it('return article as container when it is a blog', () => {
        let article = <noosfero.Article>({ id: 1, type: 'Blog' });
        expect(helper.component.getArticleContainer(article)).toEqual(1);
    });

    it('check if profile was loaded', () => {
        let profile: any = {
            id: 1,
            identifier: 'the-profile-test',
            type: 'Person'
        };
        helpers.mocks.profileService.getCurrentProfile = () => {
            return helpers.mocks.promiseResultTemplate(profile);
        };
        let component = new ContentViewerActionsComponent(<any>helpers.mocks.profileService, <any>helpers.mocks.articleService);
        expect(component.profile).toEqual(jasmine.objectContaining(profile));
    });
});
