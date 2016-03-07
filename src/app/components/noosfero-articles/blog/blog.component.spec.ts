
import {Input, provide, Component} from 'ng-forward';
import {ArticleBlog} from './blog.component';

import {createComponentFromClass, quickCreateComponent, provideEmptyObjects, createProviderToValue} from "../../../../spec/helpers.ts";


// this htmlTemplate will be re-used between the container components in this spec file
const htmlTemplate: string = '<noosfero-blog [article]="ctrl.article" [profile]="ctrl.profile"></noosfero-blog>';
let articleService = {};

describe("Blog Component", () => {

    // the karma preprocessor html2js transform the templates html into js files which put
    // the templates to the templateCache into the module templates
    // we need to load the module templates here as the template for the
    // component Noosfero ArtileView will be load on our tests
    beforeEach(angular.mock.module("templates"));

    function promiseResultTemplate(thenFunc: Function) {
        let thenFuncEmpty = (func: Function) => {
            // does nothing
            //func()
        };
        if (thenFunc) {
            return {
                then: thenFunc
            }
        } else {
            return {
                then: thenFuncEmpty
            }
        }
    }

    beforeAll(() => {
        // creating mock for articleService
        articleService = {
            getChildren: (article_id: number, filters: {}) => {
                return promiseResultTemplate();
            }
        };
    });

    it("renders the blog content", (done: Function) => {

        // Creating a container component (ArticleContainerComponent) to include
        // the component under test (ArticleView)
        @Component({
            selector: 'test-container-component',
            template: htmlTemplate,
            directives: [ArticleBlog],
            providers: [provideEmptyObjects('Restangular'), createProviderToValue('ArticleService', articleService)]
        })
        class BlogContainerComponent {
            article = { type: 'anyArticleType' };
            profile = { name: 'profile-name' };
        }

        createComponentFromClass(BlogContainerComponent).then((fixture) => {

            expect(fixture.debugElement.query('div.blog').length).toEqual(1);

            done();
        });

        it("verify the blog data", (done: Function) => {

            articleService.getChildren = (article_id: number, filters: {}) => {
                return promiseResultTemplate(() => {
                  return {
                    headers: {
                      total: 1
                    },
                    data: {
                      articles: [
                      ]
                    }
                  }
                });
            }
            @Component({
                selector: 'test-container-component',
                template: htmlTemplate,
                directives: [ArticleBlog],
                providers: [provideEmptyObjects('Restangular'), createProviderToValue('ArticleService', articleService)]
            })
            class BlogContainerComponent {
                article = { type: 'anyArticleType' };
                profile = { name: 'profile-name' };
            }

            createComponentFromClass(BlogContainerComponent).then((fixture) => {
                // and here we can inspect and run the test assertions

                // gets the children component of ArticleContainerComponent
                let articleBlog: BlogContainerComponent = fixture.debugElement.componentViewChildren[0].componentInstance;

                // and checks if the article View rendered was the Default Article View
                //expect(articleView.constructor.prototype).toEqual(ArticleDefaultView.prototype);
                expect(articleBlog["posts"]).toEqual([]);
                expect(articleBlog["totalPosts"]).toEqual(1);


                // done needs to be called (it isn't really needed, as we can read in
                // here (https://github.com/ngUpgraders/ng-forward/blob/master/API.md#createasync)
                // because createAsync in ng-forward is not really async, but as the intention
                // here is write tests in angular 2 ways, this is recommended
                done();
            });

        });

    });
