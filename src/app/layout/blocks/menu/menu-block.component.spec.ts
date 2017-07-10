import { DesignModeService } from './../../../shared/services/design-mode.service';
import { TranslateModule } from '@ngx-translate/core';
import { TranslatorService } from './../../../shared/services/translator.service';
import { PopoverModule } from 'ngx-bootstrap';
import { DragulaModule } from 'ng2-dragula';
import { ArticleService } from './../../../../lib/ng-noosfero-api/http/article.service';
import { MenuBlockComponent } from './menu-block.component';
import * as helpers from "../../../../spec/helpers";
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { tick, fakeAsync, async, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

describe("Components", () => {
    describe("Menu Block Component", () => {
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<MenuBlockComponent>;
        let component: MenuBlockComponent;
        let articles = [
            {name: 'article 1', path: 'article-1'},
            {name: 'article 2', path: 'article-2'}
        ];
        let articleService = jasmine.createSpyObj("ArticleService", ["getByProfile"]);
        articleService.getByProfile = jasmine.createSpy("getByProfile").and.returnValue(Promise.resolve({ headers: () => { }, data: articles }));

        let dragulaService = jasmine.createSpyObj("DragulaService", ["dropModel"]);
        dragulaService.dropModel = jasmine.createSpy("dropModel").and.returnValue(Promise.resolve({ headers: () => { } }));

        let scope = {};

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule, DragulaModule, PopoverModule.forRoot(), TranslateModule.forRoot()],
                declarations: [MenuBlockComponent],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    { provide: ArticleService, useValue: articleService },
                    { provide: DesignModeService, useValue: mocks.designModeService },
                    { provide: TranslatorService, useValue: mocks.translatorService }
                ]
            });
            fixture = TestBed.createComponent(MenuBlockComponent);
            component = fixture.componentInstance;
            component.owner = <noosfero.Profile>{ id: 1, name: 'profile-name', identifier: 'profile-name' };
            component.block = {
                id: 1,
                type: 'MenuBlock',
                api_content: {
                    enabled_items: [
                        { "title": "Activities", "controller": "profile", "action": "activities" },
                        { "title": "About", "controller": "profile", "action": "about" }
                    ],
                    available_items: [
                        { "title": "Communities", "controller": "memberships", "action": "index" },
                        { "title": "People", "controller": "friends", "action": "index" }
                    ]
                }
            };
            component.links = [
                { title: 'blocks.menu.activities', url: 'main.profile.info', urlParams: { profile: component.owner.identifier }, controller: 'profile', action: 'index' },
                { title: 'blocks.menu.about', url: 'main.profile.about', urlParams: { profile: component.owner.identifier }, controller: 'profile', action: 'index' }
            ];
            component.linksAvailable = [];
            component.articles = [
                { title: 'Article 1', url: 'main.profile.page', urlParams: { page: 'article-1', profile: component.owner.identifier }, path: 'article-1' },
                { title: 'Article 2', url: 'main.profile.page', urlParams: { page: 'article-2', profile: component.owner.identifier }, path: 'article-2' }
            ];
        }));

        it("receives the block and the owner as inputs", () => {
            fixture.detectChanges();
            expect(component.block.type).toEqual("MenuBlock");
            expect(component.owner.name).toEqual("profile-name");
        });

        it("make available only url's of controller profile", () => {
            expect(component.hasAvailablePage({ "title": "Activities", "controller": "profile", "action": "activities" })).toBeTruthy();
        });

        it("generate correct url for activities", () => {
            let url = [ '/profile', 'profile-name' ];
            expect(component.makeUrl({ "title": "Activities", "controller": "profile", "action": "activities" }).url).toEqual(url);
        });

        it("generate correct url for about", () => {
            let url = [ '/profile', 'profile-name', 'about' ];
            expect(component.makeUrl({ "title": "About", "controller": "profile", "action": "about" }).url).toEqual(url);
        });

        it("generate correct url for friends", () => {
            component.owner = <noosfero.Person>{ id: 1, name: 'person-name', identifier: 'person-name', type: 'Person' };
            let url = [ '/profile', 'person-name', 'friends' ];
            expect(component.makeUrl({ "title": "People", "controller": "friends", "action": "index" }).url).toEqual(url);
        });

        it("initialize links variable", () => {
            let profileLinks = [
                { title: 'blocks.menu.activities', url: 'main.profile.info', urlParams: { profile: component.owner.identifier }, controller: 'profile', action: 'index' },
                { title: 'blocks.menu.about', url: 'main.profile.about', urlParams: { profile: component.owner.identifier }, controller: 'profile', action: 'index' }
            ];
            for (let i = 0; i < component.links.length; i++) {
                expect(component.links[i]).toEqual(jasmine.objectContaining(profileLinks[i]));
            }
        });

        it("hide attribute block is true by default", () => {
            (<any>component.block).api_content = [];
            component.ngOnInit();
            expect(component.block.hide).toBeTruthy();
        });

        it("not render block if config has no url", () => {
            (<any>component.block).api_content = [];
            component.ngOnInit();
            expect(component.block.hide).toBeTruthy();
        });

        it("render block if config has no some url", () => {
            expect(component.block.hide).toBeFalsy();
        });

        it("add link to enabled list", () => {
            let link = { title: 'Article 2', url: 'main.profile.page', urlParams: { page: 'article-2', profile: component.owner.identifier }, path: 'article-2' };
            let links = component.links;
            links.push(link);
            component.add(link);
            for (let i = 0; i < component.links.length; i++) {
                expect(component.links[i]).toEqual(jasmine.objectContaining(links[i]));
            }
        });

        it("remove link from enabled list", () => {
            let links = component.links;
            let linksAvailable = component.linksAvailable;
            linksAvailable.push(links[0]);
            links.splice(0, 1);
            component.remove(0);
            for (let i = 0; i < component.links.length; i++) {
                expect(component.links[i]).toEqual(jasmine.objectContaining(links[i]));
            }
           for (let i = 0; i < component.linksAvailable.length; i++) {
                expect(component.linksAvailable[i]).toEqual(jasmine.objectContaining(linksAvailable[i]));
            }
        });

        it("not render add button when no article was selected", () => {
            component.designMode = true;
            component.selectedArticle = null;
            fixture.detectChanges();
            fixture.nativeElement.querySelector('.menu-new-item').click();
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('.btn-add-article'))).toBeNull();
        });

        it("render add button when article was selected", () => {
            component.designMode = true;
            component.selectedArticle = <noosfero.Article>{id: 2};
            fixture.detectChanges();
            fixture.nativeElement.querySelector('.menu-new-item').click();
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('.btn-add-article'))).toBeDefined();
        });
     });

});