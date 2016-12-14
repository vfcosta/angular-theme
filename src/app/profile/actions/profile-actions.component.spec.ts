import { Input, Component, provide } from 'ng-forward';

import * as helpers from "../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../spec/component-test-helper';
import { ProfileActionsComponent } from './profile-actions.component';

// this htmlTemplate will be re-used between the container components in this spec file
const htmlTemplate: string = '<profile-actions [profile]="ctrl.profile"></profile-actions>';

describe('Profile Actions Component', () => {

    let helper: ComponentTestHelper<ProfileActionsComponent>;

    beforeEach(angular.mock.module("templates"));

    let providers = [
        provide('ArticleService', {
            useValue: helpers.mocks.articleService
        })
    ].concat(helpers.provideFilters("translateFilter"));

    beforeEach((done) => {
        let cls = createClass({
            template: htmlTemplate,
            directives: [ProfileActionsComponent],
            providers: providers
        });
        helper = new ComponentTestHelper<ProfileActionsComponent>(cls, done);
    });

    it('renders content viewer actions directive', () => {
        expect(helper.all("profile-actions").length).toEqual(1);
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

    it("render the actions new item menu", () => {
        expect(helper.all("a[class|='btn dropdown-toggle']")[0]).not.toBeNull();
    });

    it("render two menu item actions", () => {
        expect(helper.all(".profile-menu ul li").length).toBe(2);
    });
});
