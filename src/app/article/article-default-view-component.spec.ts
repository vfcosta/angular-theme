import {Input, provide, Component} from 'ng-forward';
import {ArticleViewComponent, ArticleDefaultViewComponent} from './article-default-view.component';
import {ComponentTestHelper, createClass} from './../../spec/component-test-helper';

import * as helpers from "../../spec/helpers";

// this htmlTemplate will be re-used between the container components in this spec file 
const htmlTemplate: string = '<noosfero-article [article]="ctrl.article" [profile]="ctrl.profile"></noosfero-article>';


describe("Components", () => {

    // the karma preprocessor html2js transform the templates html into js files which put
    // the templates to the templateCache into the module templates
    // we need to load the module templates here as the template for the 
    // component Noosfero ArtileView will be load on our tests
    beforeEach(angular.mock.module("templates"));

    describe("Article Default View Component", () => {
        let helper: ComponentTestHelper<ArticleDefaultViewComponent>;
        const defaultViewTemplate: string = '<noosfero-default-article [article]="ctrl.article" [profile]="ctrl.profile"></noosfero-default-article>';
        let notificationService = helpers.mocks.notificationService;
        let articleService: any = helpers.mocks.articleService;
        let article = <noosfero.Article>{
            id: 1,
            profile: {
                identifier: "1"
            }
        };
        let state = <ng.ui.IStateService>jasmine.createSpyObj("state", ["go", "transitionTo"]);
        let providers = [
            provide('$state', { useValue: state }),
            provide('ArticleService', { useValue: articleService }),
            helpers.createProviderToValue('NotificationService', notificationService),
        ].concat(helpers.provideFilters("translateFilter"));

        /**
         * The beforeEach procedure will initialize the helper and parse
         * the component according to the given providers. Unfortunetly, in
         * this mode, the providers and properties given to the construtor
         * can't be overriden.
        */
        beforeEach((done) => {
            // Create the component bed for the test. Optionally, this could be done
            // in each test if one needs customization of these parameters per test
            let cls = createClass({
                template: defaultViewTemplate,
                directives: [ArticleDefaultViewComponent],
                providers: providers,
                properties: {
                    article: article
                }
            });
            helper = new ComponentTestHelper<ArticleDefaultViewComponent>(cls, done);
        });

        function getArticle() {
            return this.article;
        }

        it("it should delete article when delete is activated", () => {
            expect(helper.component.article).toEqual(article);
            // Spy the state service
            doDeleteArticle();
            expect(state.transitionTo).toHaveBeenCalled();
        });

        /**
         * Execute the delete method on the target component
         */
        function doDeleteArticle() {
            // Create a mock for the notification service confirmation
            spyOn(helper.component.notificationService, 'confirmation').and.callFake(function (params: Function) {

            });
            // Create a mock for the ArticleService removeArticle method
            spyOn(helper.component.articleService, 'remove').and.callFake(function (param: noosfero.Article) {

                return {
                    catch: () => { }
                };
            });
            helper.component.delete();
            expect(notificationService.confirmation).toHaveBeenCalled();
            helper.component.doDelete();
            expect(articleService.remove).toHaveBeenCalled();

            // After the component delete method execution, fire the
            // ArticleEvent.removed event
            simulateRemovedEvent();
        }

        /**
         * Simulate the Notification Service confirmation and ArticleService 
         * notifyArticleRemovedListeners event
         */
        function simulateRemovedEvent() {
            helper.component.notificationService["confirmation"]({ title: "Title", message: "Message" }, () => { });
            helper.component.articleService["modelRemovedEventEmitter"].next(article);
        }
    });

});
