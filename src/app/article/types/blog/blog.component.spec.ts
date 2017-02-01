import {providers} from 'ng-forward/cjs/testing/providers';

import {Input, provide, Component} from 'ng-forward';
import {ArticleBlogComponent} from './blog.component';

import {createComponentFromClass, quickCreateComponent, provideEmptyObjects, createProviderToValue, provideFilters} from "../../../../spec/helpers";

import {ComponentTestHelper, createClass} from './../../../../spec/component-test-helper';

// this htmlTemplate will be re-used between the container components in this spec file
const htmlTemplate: string = '<noosfero-blog [article]="ctrl.article" [profile]="ctrl.profile"></noosfero-blog>';

describe("Blog Component", () => {

    function promiseResultTemplate(response?: {}) {
        let thenFuncEmpty = (func: Function) => {
            // does nothing
        };
        if (response) {
            return {
                then: (func: (response: any) => void) => {
                    func(response);
                }
            };
        } else {
            return {
                then: (func: (response: any) => void) => {
                    // does nothing
                }
            };
        }
    }

    let article1 = <noosfero.Article>{
        id: 1,
        title: 'The article test'
    };

    let article2 = <noosfero.Article>{
        id: 1,
        title: 'The article test'
    };

    let articles = [ article1, article2 ];

    let articleService = {
        getChildren: (article_id: number, filters: {}) => {
            return promiseResultTemplate(null);
        },
        subscribeToArticleRemoved: (fn: Function) => {}
    };

    let helper: ComponentTestHelper<ArticleBlogComponent>;

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
            directives: [ArticleBlogComponent],
            providers: providersHelper,
            properties: {
                posts: articles
            }
        });
        helper = new ComponentTestHelper<ArticleBlogComponent>(cls, done);
    });

    it("renders the blog content", () => {
        expect(helper.debugElement.query('div.blog').length).toEqual(1);
    });

    it("verify the blog data", () => {
        expect(helper.component["posts"][0]).toEqual(jasmine.objectContaining(article1));
    });

});
