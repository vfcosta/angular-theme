import { TranslatePipe } from './../../../shared/pipes/translate-pipe';

import { RecentDocumentsBlockComponent } from './recent-documents-block.component';
import * as helpers from "./../../../../spec/helpers";
// import { PersonService } from "../../../lib/ng-noosfero-api/http/person.service";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
// import { FormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import { MomentModule } from 'angular2-moment';

// import { Observable } from 'rxjs/Observable';
// import "rxjs/add/observable/of";

// const htmlTemplate: string = '<noosfero-recent-documents-block></noosfero-recent-documents-block>';

describe("Components", () => {
    describe("Recent Documents Block Component", () => {
        let mocks = helpers.getMocks();
        // let peopleToInvite = [<noosfero.Person>{ "id": 1, "name": "Person 1" }, <noosfero.Person>{ "id": 3, "name": "Person 3" }];
        let fixture: ComponentFixture<RecentDocumentsBlockComponent>;
        let component: RecentDocumentsBlockComponent;
        let state = jasmine.createSpyObj("$state", ["href"]);
        let article = <noosfero.Article>{ name: "article1" };

        beforeEach(async(() => {
            spyOn(mocks.articleService, 'subscribeToModelRemoved');
            spyOn(mocks.blockService, 'getApiContent').and.callThrough();
            spyOn(mocks.$state, 'go');

            TestBed.configureTestingModule({
                declarations: [RecentDocumentsBlockComponent, TranslatePipe],
                providers: [
                    { provide: "blockService", useValue: mocks.blockService },
                    // { provide: "$state", useValue: state },
                    { provide: "$state", useValue: mocks.$state },
                    { provide: "articleService", useValue: mocks.articleService }
                    // { provide: "profileService", useValue: mocks.profileService },
                    // { provide: "communityService", useValue: mocks.communityService },
                    // { provide: "translatorService", useValue: mocks.translatorService }
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                // imports: [NgPipesModule, TypeaheadModule.forRoot(), FormsModule]
                imports: [NgPipesModule, MomentModule]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(RecentDocumentsBlockComponent);
                component = fixture.componentInstance;
                component.block = <noosfero.Block>{ id: 1 };
            });
        }));

        it("verify getApiContent is called ", fakeAsync(() => {
            component['blockService'].getApiContent = jasmine.createSpy("getApiContent").and.returnValue(Promise.resolve({}));
            component.ngOnInit();
            tick();
            expect(component['blockService'].getApiContent).toHaveBeenCalledWith(component.block);
        }));

        it("set documents getting content from api ", fakeAsync(() => {
            let articles = [{ id: 1 }];
            component['blockService'].getApiContent = jasmine.createSpy("getApiContent").and.returnValue(Promise.resolve({ articles: articles }));
            component.ngOnInit();
            tick();
            expect(component.documents).toBe(articles);
        }));

        it("verify subscribeToModelRemoved is called", fakeAsync(() => {
            component.ngOnInit();
            tick();
            expect(component['articleService'].subscribeToModelRemoved).toHaveBeenCalled();
        }));

        it("go to article page when open a document", fakeAsync(() => {
            component.openDocument({ path: "path", profile: { identifier: "identifier" } });
            expect(mocks.$state.go).toHaveBeenCalledWith("main.profile.page", { page: "path", profile: "identifier" });
        }));

        // FIXME put this test to works
        // it("verify removed article has been removed from list", fakeAsync(() => {
        //     let articles = [article];
        //     component['blockService'].getApiContent = jasmine.createSpy("getApiContent").and.returnValue(Promise.resolve({ articles: articles }));
        //     component.ngOnInit();
        //     tick();
        //     expect(component.documents.length).toEqual(1);
        //     simulateRemovedEvent(component);
        //     expect(component.documents.length).toEqual(0);
        // }));
        // /**
        //  * Simulate the ArticleService ArticleEvent.removed event
        //  */
        // function simulateRemovedEvent(recentDocumentsBlock: RecentDocumentsBlockComponent) {
        //     recentDocumentsBlock['articleService']['modelRemovedEventEmitter'].next(article);
        // }


    });

});
