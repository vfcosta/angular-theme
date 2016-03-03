import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Provider, Input, provide, Component} from 'ng-forward';

import {RecentDocumentsBlock} from './recent-documents.component';

const htmlTemplate: string = '<noosfero-recent-documents-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-recent-documents-block>';

const tcb = new TestComponentBuilder();

describe("Recent Documents Block Component", () => {

    beforeEach(angular.mock.module("templates"));

    let state = jasmine.createSpyObj("state", ["go"]);
    let providers = [
        new Provider('truncateFilter', { useValue: () => { } }),
        new Provider('stripTagsFilter', { useValue: () => { } }),
        new Provider('$state', { useValue: state }),
        new Provider('ArticleService', {
            useValue: {
                getByProfile: (profileId: number, filters: any): any => {
                    return Promise.resolve({ data: { articles: [{ name: "article1" }] } });
                }
            }
        }),
    ];
    @Component({ selector: 'test-container-component', template: htmlTemplate, directives: [RecentDocumentsBlock], providers: providers })
    class BlockContainerComponent {
        block = { type: 'Block', settings: {} };
        owner = { name: 'profile-name' };
        constructor() {
        }
    }

    it("get recent documents from the article service", done => {
        tcb.createAsync(BlockContainerComponent).then(fixture => {
            let recentDocumentsBlock: RecentDocumentsBlock = fixture.debugElement.componentViewChildren[0].componentInstance;
            expect(recentDocumentsBlock.documents).toEqual([{ name: "article1" }]);
            done();
        });
    });

    it("go to article page when open a document", done => {
        tcb.createAsync(BlockContainerComponent).then(fixture => {
            let recentDocumentsBlock: RecentDocumentsBlock = fixture.debugElement.componentViewChildren[0].componentInstance;
            recentDocumentsBlock.openDocument({ path: "path", profile: { identifier: "identifier" } });
            expect(state.go).toHaveBeenCalledWith("main.profile.page", { page: "path", profile: "identifier" });
            done();
        });
    });

});
