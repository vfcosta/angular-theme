import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Provider, Input, provide, Component} from 'ng-forward';
import {provideFilters} from '../../../../spec/helpers';
import {RecentDocumentsBlockComponent} from './recent-documents.component';

const htmlTemplate: string = '<noosfero-recent-documents-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-recent-documents-block>';

const tcb = new TestComponentBuilder();

describe("Components", () => {
    describe("Recent Documents Block Component", () => {

        let settingsObj = {};
        let mockedArticleService = {
            getByProfile: (profile: noosfero.Profile, filters: any): any => {
                return Promise.resolve({ data: [{ name: "article1" }], headers: (name: string) => { return name; } });
            }
        };
        let profile = { name: 'profile-name' };
        beforeEach(angular.mock.module("templates"));

        let state = jasmine.createSpyObj("state", ["go"]);


        function getProviders() {
            return [
                new Provider('$state', { useValue: state }),
                new Provider('ArticleService', {
                    useValue: mockedArticleService
                }),
            ].concat(provideFilters("truncateFilter", "stripTagsFilter"));
        }
        let componentClass: any = null;

        function getComponent() {
            @Component({ selector: 'test-container-component', template: htmlTemplate, directives: [RecentDocumentsBlockComponent], providers: getProviders() })
            class BlockContainerComponent {
                block = { type: 'Block', settings: settingsObj };
                owner = profile;
                constructor() {
                }
            }
            return BlockContainerComponent;
        }


        it("get recent documents from the article service", done => {
            tcb.createAsync(getComponent()).then(fixture => {
                let recentDocumentsBlock: RecentDocumentsBlockComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                expect(recentDocumentsBlock.documents).toEqual([{ name: "article1" }]);
                done();
            });
        });

        it("go to article page when open a document", done => {
            tcb.createAsync(getComponent()).then(fixture => {
                let recentDocumentsBlock: RecentDocumentsBlockComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                recentDocumentsBlock.openDocument({ path: "path", profile: { identifier: "identifier" } });
                expect(state.go).toHaveBeenCalledWith("main.profile.page", { page: "path", profile: "identifier" });
                done();
            });
        });

        it("it uses default limit 5 if not defined on block", done => {
            settingsObj = null;
            mockedArticleService = jasmine.createSpyObj("mockedArticleService", ["getByProfile"]);
            (<any>mockedArticleService).mocked = true;
            let thenMocked = jasmine.createSpy("then");
            mockedArticleService.getByProfile = jasmine.createSpy("getByProfile").and.returnValue({then: thenMocked});
            let getByProfileFunct = mockedArticleService.getByProfile;
            tcb.createAsync(getComponent()).then(fixture => {
                let recentDocumentsBlock: RecentDocumentsBlockComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                recentDocumentsBlock.openDocument({ path: "path", profile: { identifier: "identifier" } });
                expect(getByProfileFunct).toHaveBeenCalledWith(profile, { content_type: 'TinyMceArticle', per_page: 5 });
                done();
            });
        });

    });
});