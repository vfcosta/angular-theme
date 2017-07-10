import { HighlightsBlockSettingsComponent } from './layout/blocks/highlights/highlights-block-settings.component';
import { BlockSettingsComponent } from './layout/blocks/block-settings.component';
import { CommunityMembersProfileComponent } from './profile/community-members/community-members-profile.component';
import { DestroyProfileComponent } from './profile/destroy/destroy-profile.component';
import { ProfileEditionComponent } from './profile/configuration/profile-edition.component';
import { ProfileConfigurationComponent } from './profile/configuration/profile-configuration.component';
import { CmsComponent } from './article/cms/cms.component';
import { ProfileAboutComponent } from './profile/about/profile-about.component';
import { DomainComponent } from './domain/domain.component';
import { EditableFieldComponent } from './shared/components/editable-field/editable-field.component';
import { EnvironmentHomeComponent } from './environment/environment-home.component';
import { ActivitiesComponent } from './profile/activities/activities.component';
import { ProfileHomeComponent } from './profile/profile-home.component';
import { ContentViewerComponent } from './article/content-viewer/content-viewer.component';
import { ProfileComponent } from './profile/profile.component';
import { EnvironmentComponent } from './environment/environment.component';
import { AppComponent } from './app.component';
import { BoxComponent } from './layout/boxes/box.component';
import { BoxesComponent } from './layout/boxes/boxes.component';
import { BlockComponent } from './layout/blocks/block.component';
import { BlockContentComponent } from './layout/blocks/block-content.component';
import { MainBlockComponent } from './layout/blocks/main/main-block.component';
import { ForgotPasswordComponent } from './login/forgot-password.component';
import { LoginComponent } from './login/login.component';
import swal from 'sweetalert2';
import { EventsHubService } from './shared/services/events-hub.service';
import { CommentParagraphEventService } from './../plugins/comment_paragraph/events/comment-paragraph-event.service';
import { ThemeService } from './shared/services/theme.service';
import { BodyStateClassesService } from './shared/services/body-state-classes.service';
import { DesignModeService } from './shared/services/design-mode.service';
import { AuthService } from './login/auth.service';
import { DomainService } from './../lib/ng-noosfero-api/http/domain.service';
import { SessionService } from './login/session.service';
import { PersonService } from './../lib/ng-noosfero-api/http/person.service';
import { TaskService } from './../lib/ng-noosfero-api/http/task.service';
import { BlockService } from './../lib/ng-noosfero-api/http/block.service';
import { UserService } from './../lib/ng-noosfero-api/http/user.service';
import { CommunityService } from './../lib/ng-noosfero-api/http/community.service';
import { SettingsService } from './../lib/ng-noosfero-api/http/settings.service';
import { RoleService } from './../lib/ng-noosfero-api/http/role.service';
import { RegisterService } from './../lib/ng-noosfero-api/http/register.service';
import { PasswordService } from './../lib/ng-noosfero-api/http/password.service';
import { PermissionService } from './shared/services/permission.service';
import { CommentParagraphService } from './../plugins/comment_paragraph/http/comment-paragraph.service';
import { NotificationService } from './shared/services/notification.service';
import { TranslatorService } from './shared/services/translator.service';
import { EnvironmentService } from './../lib/ng-noosfero-api/http/environment.service';
import { ProfileService } from './../lib/ng-noosfero-api/http/profile.service';
import { ArticleService } from './../lib/ng-noosfero-api/http/article.service';
import { CommentService } from './../lib/ng-noosfero-api/http/comment.service';
import { HeaderService } from './shared/services/header.service';
import { ArticleViewComponent } from './article/article-view.component';
import { ActivityComponent } from './profile/activities/activity/activity.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { ArticleEditorComponent } from './article/cms/article-editor/article-editor.component';
import { ActivityHeaderComponent } from './profile/activities/activity/header/activity-header.component';
import { CustomContentComponent } from './profile/custom-content/custom-content.component';
import { ValidationMessageComponent } from './shared/components/validation-message/validation-message.component';
import { AllowCommentComponent } from './../plugins/comment_paragraph/allow-comment/allow-comment.component';
import { ArticleDefaultViewComponent } from './article/types/default/article-default.component';
import { FolderComponent } from './article/types/folder/folder.component';
import { ArticleBlogComponent } from './article/types/blog/blog.component';
import { TaskAcceptComponent } from './task/task-list/task-accept.component';
import { ArticleContentHotspotComponent } from './hotspot/article-content-hotspot.component';
import { BasicOptionsComponent } from './article/cms/basic-options/basic-options.component';
import { ArticleToolbarHotspotComponent } from './hotspot/article-toolbar-hotspot.component';
import { ThemeFooterComponent } from './layout/theme-footer/theme-footer.component';
import * as theme from '../../themes';
import { ThemeHeaderComponent } from './layout/theme-header/theme-header.component';
import { RegisterComponent } from './account/register.component';
import { SearchComponent } from './search/search.component';
import { PasswordComponent } from './login/new-password.component';
import { ArticleIconComponent } from './article/article-icon/article-icon.component';
import { SearchFormComponent } from './search/search-form/search-form.component';
import { TasksMenuComponent } from './task/tasks-menu/tasks-menu.component';
import { TasksComponent } from './task/tasks/tasks.component';
import { TaskComponent } from './task/task.component';
import { ProfileActionsComponent } from './profile/actions/profile-actions.component';
import { DesignModeTogglerComponent } from './layout/design-mode-toggler/design-mode-toggler.component';
import { ConfigBarComponent } from './layout/config-bar/config-bar.component';
import { LayoutConfigComponent } from './layout/layout-config/layout-config.component';
import { ContextBarComponent } from './layout/context-bar/context-bar.component';
import { ProfileHeaderComponent } from './profile/header/profile-header.component';
import { AddBlockComponent } from './layout/boxes/add-block/add-block.component';
import { TopProfileImageComponent } from './profile/top-image/top-profile-image.component';
import { BlockEditionComponent } from './layout/blocks/block-edition/block-edition.component';
import { BreadcrumbsBlockComponent } from './../plugins/breadcrumbs/blocks/breadcrumbs-block/breadcrumbs-block.component';
import { DisplayContentBlockComponent } from './layout/blocks/display-content/display-content-block.component';
import { HighlightsBlockComponent } from './layout/blocks/highlights/highlights-block.component';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { TagsBlockComponent } from './layout/blocks/tags/tags-block.component';
import { LoginBlockComponent } from './layout/blocks/login-block/login-block.component';
import { NoosferoTemplatePipe } from './shared/pipes/noosfero-template.ng2.filter';
import { IconPickerComponent } from './shared/components/icon-picker/icon-picker.component';
import { EditableLinkComponent } from './shared/components/editable-link/editable-link.component';
import { LinkListBlockComponent } from './layout/blocks/link-list/link-list-block.component';
import { MenuBlockComponent } from './layout/blocks/menu/menu-block.component';
import { ProfileSummaryComponent } from './profile/summary/profile-summary.component';
import { NewCommunityComponent } from './profile/configuration/communities/new-community.component';
import { EditCommunityComponent } from './profile/configuration/communities/edit-community.component';
import { PersonCommunitiesComponent } from './profile/configuration/communities/person-communities.component';
import { ChangePasswordComponent } from './profile/configuration/change-password/change-password.component';
import { PersonFriendsComponent } from './profile/configuration/friends/person-friends.component';
import { CommunityMembersMyProfileComponent } from './profile/configuration/communities/community-members-my-profile.component';
import { ProfilePersonalDataComponent } from './profile/configuration/personal-data/profile-personal-data.component';
import { ProfileConfigurationMenuComponent } from './profile/configuration/menu/profile-configuration-menu.component';
import { NoosferoUrlPipe } from './shared/pipes/noosfero-url.pipe';
import { ProfileListEditionComponent } from './profile/profile-list/edition/profile-list-edition.component';
import { ProfileFastEditionComponent } from './profile/fast-edition/profile-fast-edition.component';
import { CommunitiesBlockComponent } from './layout/blocks/communities/communities-block.component';
import { MembersBlockComponent } from './layout/blocks/members/members-block.component';
import { PeopleBlockComponent } from './layout/blocks/people/people-block.component';
import { ProfileImageBlockComponent } from './layout/blocks/profile-image/profile-image-block.component';
import { CommunityMembersComponent } from './profile/community-members/community-members.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { LanguageSelectorComponent } from './layout/language-selector/language-selector.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RawHTMLBlockComponent } from './layout/blocks/raw-html/raw-html-block.component';
import { StatisticsBlockComponent } from "./layout/blocks/statistics/statistics-block.component";
import { ImageCropperModule } from 'ng2-img-cropper';
import { PopoverModule, ModalModule, TypeaheadModule, BsDropdownModule, CarouselModule, CollapseModule } from 'ngx-bootstrap';
import { ProfileListComponent } from './profile/profile-list/profile-list.component';
import { ProfileJoinComponent } from './profile/profile-join/profile-join.component';
import { DragulaModule, DragulaService } from 'ng2-dragula';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InviteComponent } from './profile/configuration/communities/invite.component';
import { RecentDocumentsBlockComponent } from './layout/blocks/recent-documents/recent-documents-block.component';
import * as plugins from "../plugins";
import { SharedModule } from './shared.module';
import { MyDatePickerModule } from 'mydatepicker';
import { DynamicHTMLModule, DynamicComponentModule } from 'ng-dynamic';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { LocalStorageModule } from 'angular-2-local-storage';
import { SweetAlert2Module } from '@toverux/ngsweetalert2';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, JsonpModule, Http } from '@angular/http';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { BootstrapResizableDirective } from './shared/components/bootstrap-resizable/bootstrap-resizable.directive';
import { NgProgressModule, NgProgressBrowserXhr } from 'ngx-progressbar';
import { BrowserXhr } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

export function RestangularConfigFactory (RestangularProvider, sessionService: SessionService, translatorService: TranslatorService, notificationService: NotificationService) {
    RestangularProvider.setBaseUrl("/api/v1");
    RestangularProvider.setFullResponse(true);
    RestangularProvider.addFullRequestInterceptor((element, operation, path, url, headers, params) => {
        if (sessionService.currentUser()) {
            (<any>headers)["Private-Token"] = sessionService.currentUser().private_token;
        }
        (<any>headers)["Accept-Language"] = translatorService.currentLanguage();
        return <any>{ headers: <any>headers };
    });
    RestangularProvider.addErrorInterceptor((response, subject, responseHandler) => {
        notificationService.httpError(response.status, response.data);
        return true; // return true to continue the promise chain and call catch
    });
}

export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, '/languages/', '.json');
}

@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        ModalModule.forRoot(),
        ImageCropperModule,
        PopoverModule.forRoot(),
        DragulaModule,
        TypeaheadModule.forRoot(),
        BsDropdownModule.forRoot(),
        CarouselModule.forRoot(),
        CollapseModule.forRoot(),
        BrowserAnimationsModule,
        TagCloudModule,
        SharedModule,
        MyDatePickerModule,
        DynamicHTMLModule.forRoot({
            components: plugins.macros
        }),
        RestangularModule.forRoot([SessionService, TranslatorService, NotificationService], RestangularConfigFactory),
        LocalStorageModule.withConfig({
            prefix: 'noosfero',
            storageType: 'localStorage'
        }),
        SweetAlert2Module,
        ToastrModule.forRoot(),
        HttpModule,
        JsonpModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        }),
        Ng2PageScrollModule.forRoot(),
        NgProgressModule,
        AppRoutingModule,
    ],
    declarations: [
        FooterComponent,
        LanguageSelectorComponent,
        RawHTMLBlockComponent,
        RecentDocumentsBlockComponent,
        StatisticsBlockComponent,
        TaskListComponent,
        CommunitiesBlockComponent,
        MembersBlockComponent,
        PeopleBlockComponent,
        ProfileImageBlockComponent,
        CommunityMembersComponent,
        ProfileFastEditionComponent,
        ValidationMessageComponent,
        ProfileListComponent,
        ProfileJoinComponent,
        ProfileConfigurationMenuComponent,
        ProfilePersonalDataComponent,
        NoosferoUrlPipe,
        ProfileListEditionComponent,
        NewCommunityComponent,
        ChangePasswordComponent,
        PersonFriendsComponent,
        CommunityMembersMyProfileComponent,
        EditCommunityComponent,
        PersonCommunitiesComponent,
        MenuBlockComponent,
        InviteComponent,
        BootstrapResizableDirective,
        ProfileSummaryComponent,
        LoginBlockComponent,
        LinkListBlockComponent,
        EditableLinkComponent,
        EditableFieldComponent,
        IconPickerComponent,
        NoosferoTemplatePipe,
        HighlightsBlockComponent,
        DisplayContentBlockComponent,
        TagsBlockComponent,
        BreadcrumbsBlockComponent,
        BlockEditionComponent,
        AddBlockComponent,
        TopProfileImageComponent,
        ProfileHeaderComponent,
        ContextBarComponent,
        LayoutConfigComponent,
        ProfileActionsComponent,
        ConfigBarComponent,
        DesignModeTogglerComponent,
        TaskComponent,
        TasksComponent,
        TasksMenuComponent,
        SearchFormComponent,
        ArticleIconComponent,
        PasswordComponent,
        RegisterComponent,
        ThemeHeaderComponent,
        ThemeFooterComponent,
        ArticleToolbarHotspotComponent,
        BasicOptionsComponent,
        TaskAcceptComponent,
        ArticleContentHotspotComponent,
        ArticleBlogComponent,
        FolderComponent,
        ArticleDefaultViewComponent,
        CustomContentComponent,
        ActivityHeaderComponent,
        ArticleEditorComponent,
        NavbarComponent,
        ActivityComponent,
        ArticleViewComponent,
        LoginComponent,
        ForgotPasswordComponent,
        MainBlockComponent,
        BlockContentComponent,
        BlockComponent,
        BoxesComponent,
        BoxComponent,
        AppComponent,
        EnvironmentComponent,
        ProfileComponent,
        ContentViewerComponent,
        ProfileHomeComponent,
        ActivitiesComponent,
        EnvironmentHomeComponent,
        DomainComponent,
        SearchComponent,
        ProfileAboutComponent,
        CmsComponent,
        ProfileConfigurationComponent,
        ProfileEditionComponent,
        DestroyProfileComponent,
        CommunityMembersProfileComponent,
        BlockSettingsComponent,
        HighlightsBlockSettingsComponent,
    ].concat(plugins.ng2MainComponents).concat(theme.components),
    entryComponents: [
        FooterComponent,
        LanguageSelectorComponent,
        RawHTMLBlockComponent,
        RecentDocumentsBlockComponent,
        StatisticsBlockComponent,
        TaskListComponent,
        CommunitiesBlockComponent,
        MembersBlockComponent,
        PeopleBlockComponent,
        ProfileImageBlockComponent,
        CommunityMembersComponent,
        ProfileFastEditionComponent,
        ProfileConfigurationMenuComponent,
        ProfileListComponent,
        ProfileJoinComponent,
        EditCommunityComponent,
        MenuBlockComponent,
        ProfileJoinComponent,
        InviteComponent,
        ProfileSummaryComponent,
        ProfileJoinComponent,
        LoginBlockComponent,
        LinkListBlockComponent,
        EditableLinkComponent,
        IconPickerComponent,
        DisplayContentBlockComponent,
        HighlightsBlockComponent,
        TagsBlockComponent,
        BreadcrumbsBlockComponent,
        BlockEditionComponent,
        AddBlockComponent,
        TopProfileImageComponent,
        ProfileHeaderComponent,
        ContextBarComponent,
        LayoutConfigComponent,
        ProfileActionsComponent,
        ConfigBarComponent,
        DesignModeTogglerComponent,
        TasksMenuComponent,
        SearchFormComponent,
        ArticleIconComponent,
        ThemeHeaderComponent,
        ThemeFooterComponent,
        ArticleToolbarHotspotComponent,
        BasicOptionsComponent,
        TaskAcceptComponent,
        ArticleContentHotspotComponent,
        ArticleBlogComponent,
        FolderComponent,
        ArticleDefaultViewComponent,
        CustomContentComponent,
        ActivityHeaderComponent,
        ArticleEditorComponent,
        NavbarComponent,
        ActivityComponent,
        ArticleViewComponent,
        BlockContentComponent,
        BlockComponent,
        BoxesComponent,
        EditableFieldComponent,
    ].concat(plugins.ng2MainComponents),
    providers: [
        HeaderService,
        CommentService,
        ArticleService,
        SessionService,
        ProfileService,
        EnvironmentService,
        CommentParagraphService,
        PermissionService,
        PasswordService,
        RegisterService,
        RoleService,
        SettingsService,
        CommunityService,
        UserService,
        BlockService,
        TaskService,
        PersonService,
        DomainService,
        AuthService,
        DesignModeService,
        BodyStateClassesService,
        ThemeService,
        CommentParagraphEventService,
        EventsHubService,
        TranslatorService,
        NotificationService,
        { provide: "sweetAlert", useValue: swal },
        { provide: 'Window',  useValue: window },
        { provide: BrowserXhr, useClass: NgProgressBrowserXhr },
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule {
    ngDoBootstrap() {
    }
}
