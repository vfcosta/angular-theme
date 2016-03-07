import {
    Input,
    provide,
    Component
} from 'ng-forward';
import {
    ArticleBlog
} from './blog.component';

import {
    createComponentFromClass,
    quickCreateComponent,
    provideEmptyObjects,
    createProviderToValue,
    getAngularService
} from "../../../../spec/helpers.ts";


// this htmlTemplate will be re-used between the container components in this spec file
const htmlTemplate: string = '<noosfero-blog [article]="ctrl.article" [profile]="ctrl.profile"></noosfero-blog>';

let articleService: {
    getChildren: Function
} = < any > {};

describe("Blog Component", () => {

    // the karma preprocessor html2js transform the templates html into js files which put
    // the templates to the templateCache into the module templates
    // we need to load the module templates here as the template for the
    // component Noosfero ArtileView will be load on our tests
    beforeEach(angular.mock.module("templates"));

    function promiseResultTemplate(response ? : {}) {
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

    beforeAll(() => {
        // creating mock for articleService
        articleService = {
            getChildren: (article_id: number, filters: {}) => {
                return promiseResultTemplate(null);
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
            article = {
                type: 'anyArticleType'
            };
            profile = {
                name: 'profile-name'
            };
        }

        createComponentFromClass(BlogContainerComponent).then((fixture) => {

            expect(fixture.debugElement.query('div.blog').length).toEqual(1);

            done();
        });



    });

    it("get $q service", () => {
        let $q = getAngularService<ng.IQService>("$q");
        console.log($q);
    });

    it("verify the blog data", (done: Function) => {

        // defining a mock result to articleService.getChildren method
        articleService.getChildren = (article_id: number, filters: {}) => {
            return promiseResultTemplate({
                headers: (headerName: string) => {
                    return 1;
                },
                data: < any > {
                    articles: []
                }
            });
        };

        @Component({
            selector: 'test-container-component',
            template: htmlTemplate,
            directives: [ArticleBlog],
            providers: [provideEmptyObjects('Restangular'), createProviderToValue('ArticleService', articleService)]
        })
        class BlogContainerComponent {
            article = {
                type: 'anyArticleType'
            };
            profile = {
                name: 'profile-name'
            };
        }

        createComponentFromClass(BlogContainerComponent).then((fixture) => {

            // gets the children component of BlogContainerComponent
            let articleBlog: BlogContainerComponent = fixture.debugElement.componentViewChildren[0].componentInstance;

            // check if the component property are the provided by the mocked articleService 
            expect(( < any > articleBlog)["posts"]).toEqual([]);
            expect(( < any > articleBlog)["totalPosts"]).toEqual(1);


            // done needs to be called (it isn't really needed, as we can read in
            // here (https://github.com/ngUpgraders/ng-forward/blob/master/API.md#createasync)
            // because createAsync in ng-forward is not really async, but as the intention
            // here is write tests in angular 2 ways, this is recommended
            done();
        });

    });

});