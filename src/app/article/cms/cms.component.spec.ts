import { ActivatedRoute, Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProfileService } from './../../../lib/ng-noosfero-api/http/profile.service';
import { NotificationService } from './../../shared/services/notification.service';
import { ArticleService } from './../../../lib/ng-noosfero-api/http/article.service';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { EventsHubService } from './../../shared/services/events-hub.service';
import { CmsComponent } from './cms.component';
import * as helpers from '../../../spec/helpers';

describe("Cms Component", () => {
    let profile = { id: 1 };
    let mocks = helpers.getMocks();
    let fixture: ComponentFixture<CmsComponent>;
    let component: CmsComponent;

    beforeEach(async(() => {
        spyOn(mocks.profileService, "getCurrentProfile").and.returnValue(Promise.resolve(profile));
        spyOn(mocks.articleService, "createInParent").and.returnValue(Promise.resolve({ data: { path: "path", type: "TextArticle", profile: { identifier: "profile" } } }));
        spyOn(mocks.articleService, "updateArticle").and.returnValue(Promise.resolve({ data: { path: "path", type: "TextArticle", profile: { identifier: "profile" } } }));
        spyOn(mocks.articleService, "get").and.returnValue({ data: { path: "parent-path", type: "TextArticle", profile: { identifier: "profile" } } });
        spyOn(mocks.router, "navigate");
        spyOn(mocks.notificationService, "success");
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, FormsModule, TranslateModule.forRoot()],
            declarations: [CmsComponent],
            providers: [
                { provide: ArticleService, useValue: mocks.articleService },
                { provide: NotificationService, useValue: mocks.notificationService },
                { provide: ProfileService, useValue: mocks.profileService },
                { provide: "Window", useValue: mocks.window },
                { provide: EventsHubService, useValue: mocks.eventsHubService },
                { provide: ActivatedRoute, useValue: mocks.route },
                { provide: Router, useValue: mocks.router },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });
        fixture = TestBed.createComponent(CmsComponent);
        component = fixture.componentInstance;
    }));

    it("create an article in the current profile when save", fakeAsync(() => {
        component.parentId = 1;
        component.save();
        tick();
        expect(mocks.articleService.createInParent).toHaveBeenCalledWith(1, component.article);
    }));

    it("got to the new article page and display an alert when saving sucessfully", fakeAsync(() => {
        component.parentId = 1;
        component.save();
        tick();
        expect(mocks.router.navigate).toHaveBeenCalledWith(["profile", "path"]);
        expect(mocks.notificationService.success).toHaveBeenCalled();
    }));

    it("go back when cancel article edition", () => {
        TestBed.get("Window").history = { back: jasmine.createSpy('back') };
        component.cancel();
        expect(TestBed.get("Window").history.back).toHaveBeenCalled();
    });

    it("edit existing article when save", fakeAsync(() => {
        component.parentId = 1;
        component.id = 2;
        component.save();
        tick();
        expect(mocks.articleService.updateArticle).toHaveBeenCalledWith(component.article);
    }));
});
