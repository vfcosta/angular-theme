import { ProfileComponent } from './../../profile/profile.component';
import { ActivitiesComponent } from './../../profile/activities/activities.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NoosferoTemplatePipe } from './../../shared/pipes/noosfero-template.ng2.filter';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PermissionNg2Directive } from './../../shared/components/permission/permission.ng2.directive';
import { By } from '@angular/platform-browser';
import { DesignModeService } from './../../shared/services/design-mode.service';
import { SessionService } from './../../login/session.service';
import { AuthService } from './../../login/auth.service';
import { TranslatorService } from './../../shared/services/translator.service';
import { NotificationService } from './../../shared/services/notification.service';
import { BlockComponent } from './block.component';
import * as helpers from "../../../spec/helpers";
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe("Block Component", () => {
    let fixture: ComponentFixture<BlockComponent>;
    let component: BlockComponent;
    let mocks = helpers.getMocks();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BlockComponent, PermissionNg2Directive, NoosferoTemplatePipe],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: NotificationService, useValue: mocks.notificationService },
                { provide: AuthService, useValue: mocks.authService },
                { provide: SessionService, useValue: mocks.sessionService },
                { provide: TranslatorService, useValue: mocks.translatorService },
                { provide: DesignModeService, useValue: mocks.designModeService },
            ],
            imports: [RouterTestingModule, BrowserAnimationsModule, TranslateModule.forRoot()]
        });
        fixture = TestBed.createComponent(BlockComponent);
        component = fixture.componentInstance;
        component.block = <noosfero.Block>{ id: 1, settings: { visualization: { columns: 7 } } };
        component.owner = <noosfero.Profile>{ id: 1, identifier: 'profile-name', type: 'Person' };
    }));

    it("set isHomepage as false by default", () => {
        fixture.detectChanges();
        expect(component.isHomepage).toBeFalsy();
    });

    it("set isHomepage as true when in profile home page", () => {
        TestBed.get(ActivatedRoute).snapshot.component = ProfileComponent;
        fixture.detectChanges();
        expect(component.isHomepage).toBeTruthy();
    });

    it("set isHomepage as true when in profile info page", () => {
        TestBed.get(ActivatedRoute).snapshot.component = ActivitiesComponent;
        fixture.detectChanges();
        expect(component.isHomepage).toBeTruthy();
    });

    it("set isHomepage as true when in profile page", () => {
        spyOnProperty(TestBed.get(Router), 'url', 'get').and.returnValue('/page');
        (<noosfero.Profile>component.owner).homepage = '/page';
        fixture.detectChanges();
        expect(component.isHomepage).toBeTruthy();
    });

    it("set isHomepage as true when in environment home page", () => {
        component.owner = <noosfero.Environment>{ type: "Environment"};
        fixture.detectChanges();
        expect(component.isHomepage).toBeTruthy();
    });

    it("return true in canDisplay when no display option is setted", () => {
        component.block = <any>{};
        expect(component.canDisplay()).toEqual(true);
    });

    it("return false in canDisplay for an invisible block", () => {
        component.block = <any>{ settings: { display: "never" } };
        expect(component.canDisplay()).toEqual(false);
    });

    it("return false in canDisplay with except_home_page in homepage", () => {
        component.block = <any>{ settings: { display_user: "except_home_page" } };
        expect(component.canDisplay()).toEqual(false);
    });

    it("return false in canDisplay with home_page_only outside homepage", () => {
        component.block = <any>{ settings: { display_user: "home_page_only" } };
        spyOnProperty(TestBed.get(Router), 'url', 'get').and.returnValue('/search');
        component.ngOnInit();
        expect(component.canDisplay()).toEqual(false);
    });

    it("return true in canDisplay when display_user is all for logged user", () => {
        component.block = <any>{ settings: { display_user: "all" } };
        expect(component.canDisplay()).toEqual(true);
    });

    it("return true in canDisplay when display_user is all for not logged user", () => {
        component.currentUser = null;
        component.block = <any>{ settings: { display_user: "all" } };
        expect(component.canDisplay()).toEqual(true);
    });

    it("return false in canDisplay when display_user is logged for not logged user", () => {
        component.currentUser = null;
        component.block = <any>{ settings: { display_user: "logged" } };
        expect(component.canDisplay()).toEqual(false);
    });

    it("return false in canDisplay when display_user is not_logged for logged user", () => {
        component.block = <any>{ settings: { display_user: "not_logged" } };
        expect(component.canDisplay()).toEqual(false);
    });

    it("return false in canDisplay when current language is not equal to language in block settings", () => {
        component['translatorService'].currentLanguage = jasmine.createSpy("currentLanguage").and.returnValue("pt");
        component.block = <any>{ settings: { language: "en" } };
        expect(component.canDisplay()).toEqual(false);
    });

    it("return false in canDisplay when hide is true", () => {
        component.block = <any>{ id: 1, hide: true };
        expect(component.canDisplay()).toEqual(false);
    });

    it("return true in canDisplay when hide is not true", () => {
        component.block = <any>{ id: 1, hide: false };
        expect(component.canDisplay()).toEqual(true);
    });

    it("display block actions in design mode", () => {
        component.block = <any>{ id: 1, hide: false };
        component.designMode = true;
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('.block-actions')).length).toEqual(1);
    });

    it("not display block actions in normal mode", () => {
        component.block = <any>{ id: 1, hide: false };
        component.designMode = false;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.block-actions')).styles['display']).toEqual('none');
    });

    it("set block columns according to visualization settings", () => {
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('.noosfero-block.col-md-7')).length).toEqual(1);
    });

    it("display block title if it's in design mode", () => {
        component.block = <any>{ id: 1, title: '' };
        component.designMode = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.panel-heading')).styles['display']).not.toEqual('none');
    });

    it("display block title if the block has title", () => {
        component.block = <any>{ id: 1, title: 'some title' };
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.panel-title')).nativeElement.innerHTML).toContain('some title');
    });

    it("hides block if marked for removal", () => {
        component.block = <any>{ id: 1, settings: { visualization: {} }};
        component.markForDeletion();
        expect(component.animation).toEqual("zoomOutUp");
    });
});
