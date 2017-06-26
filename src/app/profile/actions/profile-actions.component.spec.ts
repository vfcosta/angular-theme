import { TranslateModule } from '@ngx-translate/core';
import { TranslatorService } from './../../shared/services/translator.service';
import { ArticleService } from './../../../lib/ng-noosfero-api/http/article.service';
import { Input, Component } from '@angular/core';
import * as helpers from "../../../spec/helpers";
import { ProfileActionsComponent } from './profile-actions.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BsDropdownModule } from 'ngx-bootstrap';

describe('Profile Actions Component', () => {
    let mocks = helpers.getMocks();
    let fixture: ComponentFixture<ProfileActionsComponent>;
    let component: ProfileActionsComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [BsDropdownModule.forRoot(), TranslateModule.forRoot()],
            declarations: [ProfileActionsComponent],
            providers: [
                { provide: ArticleService, useValue: helpers.mocks.articleService },
                { provide: TranslatorService, useValue: mocks.translatorService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(ProfileActionsComponent);
        component = fixture.componentInstance;
        component.profile = <noosfero.Profile>{ id: 1, identifier: 'adminuser', type: "Person", permissions: ['allow_edit'] };
    }));

    it('renders content viewer actions directive', () => {
        expect(queryAll(".profile-menu").length).toEqual(1);
    });

    it('return article parent as container when it is not a folder', () => {
        let article = <noosfero.Article>({ id: 1, type: 'TextArticle', parent: { id: 2 } });
        expect(component.getArticleContainer(article)).toEqual(2);
    });

    it('return article as container when it is a folder', () => {
        let article = <noosfero.Article>({ id: 1, type: 'Folder' });
        expect(component.getArticleContainer(article)).toEqual(1);
    });

    it('return article as container when it is a blog', () => {
        let article = <noosfero.Article>({ id: 1, type: 'Blog' });
        expect(component.getArticleContainer(article)).toEqual(1);
    });

    it("render the actions new item menu", () => {
        expect(queryAll("a[class|='btn btn-sm btn-primary']")[0]).not.toBeNull();
    });

    it("render two menu item actions", fakeAsync( () => {
        renderDynamicDropDownMenu();
        expect(queryAll(".profile-actions-item").length).toBe(2);
    }));

    function queryAll(selector: string) {
        let compiled = fixture.debugElement;
        return compiled.queryAll(By.css(selector));
    }

    function renderDynamicDropDownMenu() {
        fixture.detectChanges();
        let toggleButton = fixture.nativeElement.querySelector('button');
        toggleButton.click();
        tick();
        fixture.detectChanges();
    }
});
