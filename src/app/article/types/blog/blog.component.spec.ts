import {
providers
} from 'ng-forward/cjs/testing/providers';

import {
Input,
Component
} from 'ng-forward';
import {
ArticleBlogComponent
} from './blog.component';

import {
createComponentFromClass,
quickCreateComponent,
provideEmptyObjects,
createProviderToValue,
provideFilters
} from "../../../../spec/helpers.ts";

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

    let articleService = {
        getChildren: (article_id: number, filters: {}) => {
            return promiseResultTemplate(null);
        }
    };

    @Component({
        selector: 'test-container-component',
        template: htmlTemplate,
        directives: [ArticleBlogComponent],
        providers: [
            provideEmptyObjects('Restangular'),
            createProviderToValue('ArticleService', articleService),
            provideFilters('truncateFilter')
        ]
    })
    class BlogContainerComponent {
        article = {
            type: 'anyArticleType'
        };
        profile = {
            name: 'profile-name'
        };
    }

    beforeEach(() => {

        // the karma preprocessor html2js transform the templates html into js files which put
        // the templates to the templateCache into the module templates
        // we need to load the module templates here as the template for the
        // component Noosfero ArtileView will be load on our tests
        angular.mock.module("templates");

        providers((provide: any) => {
            return <any>[
                provide('ArticleService', {
                    useValue: articleService
                })
            ];
        });
    });

    it("renders the blog content", (done: Function) => {

        createComponentFromClass(BlogContainerComponent).then((fixture) => {

            expect(fixture.debugElement.query('div.blog').length).toEqual(1);

            done();
        });
    });

    it("verify the blog data", (done: Function) => {

        let articles = [{
            id: 1,
            title: 'The article test'
        }];

        let result = { data: articles, headers: (name: string) => { return 1; } };

        // defining a mock result to articleService.getChildren method
        articleService.getChildren = (article_id: number, filters: {}) => {
            return promiseResultTemplate(result);
        };

        createComponentFromClass(BlogContainerComponent).then((fixture) => {

            // gets the children component of BlogContainerComponent
            let articleBlog: BlogContainerComponent = fixture.debugElement.componentViewChildren[0].componentInstance;

            // check if the component property are the provided by the mocked articleService
            let post = {
                id: 1,
                title: 'The article test'
            };
            expect((<any>articleBlog)["posts"][0]).toEqual(jasmine.objectContaining(post));
            expect((<any>articleBlog)["totalPosts"]).toEqual(1);

            done();
        });

    });

});