import { ProfileService } from './../../../lib/ng-noosfero-api/http/profile.service';
import { ArticleService } from './../../../lib/ng-noosfero-api/http/article.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import * as helpers from "../../../spec/helpers";
import {ContentViewerComponent} from './content-viewer.component';

describe('Content Viewer Component', () => {
    let mocks = helpers.getMocks();
    let fixture: ComponentFixture<ContentViewerComponent>;
    let component: ContentViewerComponent;
    let article: any = {
        id: 1,
        title: 'The article test'
    };
    let profile: any = {
        id: 1,
        identifier: 'the-profile-test',
        type: 'Person'
    };

    beforeEach(async(() => {
        mocks.profileService.getCurrentProfile = jasmine.createSpy("getCurrentProfile").and.returnValue(Promise.resolve(profile));
        mocks.articleService.getArticleByProfileAndPath = jasmine.createSpy("getArticleByProfileAndPath").and.returnValue(Promise.resolve({ data: article }));
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, TranslateModule.forRoot()],
            declarations: [ContentViewerComponent],
            providers: [
                { provide: ArticleService, useValue: mocks.articleService },
                { provide: ProfileService, useValue: mocks.profileService },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });
        fixture = TestBed.createComponent(ContentViewerComponent);
        component = fixture.componentInstance;
    }));

    it('check if article was loaded', () => {
        expect(component.profile).toEqual(profile);
        expect(component.article).toEqual(article);
    });
});
