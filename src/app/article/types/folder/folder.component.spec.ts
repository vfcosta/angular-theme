import { providers } from 'ng-forward/cjs/testing/providers';
import { Input, provide, Component } from 'ng-forward';
import { FolderComponent } from './folder.component';
import { ComponentTestHelper, createClass } from './../../../../spec/component-test-helper';
import * as helpers from "../../../../spec/helpers";

const htmlTemplate: string = '<noosfero-folder [article]="ctrl.article" [profile]="ctrl.profile"></noosfero-folder>';

describe("Folder Component", () => {

    let article1 = <noosfero.Article>{
        id: 1,
        title: 'The article test'
    };

    let article2 = <noosfero.Article>{
        id: 1,
        title: 'The article test'
    };

    let articles = [article1, article2];

    let articleService = {
        getChildren: (article_id: number, filters: {}) => {
            return helpers.mocks.promiseResultTemplate({ data: articles, headers: (attr: String) => { return 2; } });
        }
    };

    let helper: ComponentTestHelper<FolderComponent>;

    beforeEach(angular.mock.module("templates"));

    beforeEach((done) => {

        providers((provide: any) => {
            return <any>[
                provide('ArticleService', {
                    useValue: articleService
                })
            ];
        });
        let providersHelper = [
            provide('ArticleService', { useValue: articleService })
        ];
        let cls = createClass({
            template: htmlTemplate,
            directives: [FolderComponent],
            providers: providersHelper,
            properties: {
                posts: articles
            }
        });
        helper = new ComponentTestHelper<FolderComponent>(cls, done);
    });

    it("renders the folder content", () => {
        expect(helper.all('.folder .media').length).toEqual(2);
    });
});
