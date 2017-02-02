import { LanguageSelectorComponent } from './layout/language-selector/language-selector.component';
import { TranslatePipe } from './shared/pipes/translate-pipe';
import { FooterComponent } from './layout/footer/footer.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import { ProfileImageComponent } from "./profile/image/profile-image.component";
import { RawHTMLBlockComponent } from './layout/blocks/raw-html/raw-html-block.component';
import { StatisticsBlockComponent } from "./layout/blocks/statistics/statistics-block.component";

@NgModule({
    imports: [
        BrowserModule,
        UpgradeModule
    ],
    declarations: [
        FooterComponent,
        TranslatePipe,
        LanguageSelectorComponent,
        RawHTMLBlockComponent,
        StatisticsBlockComponent,
        ProfileImageComponent
    ],
    entryComponents: [
        FooterComponent,
        LanguageSelectorComponent,
        RawHTMLBlockComponent,
        StatisticsBlockComponent,
        ProfileImageComponent
    ],
    providers: [{
        provide: 'authService',
        useFactory: (i: any) => i.get('AuthService'),
        deps: ['$injector']
    }, {
            provide: 'sessionService',
            useFactory: (i: any) => i.get('SessionService'),
            deps: ['$injector']
        }, {
            provide: '$state',
            useFactory: (i: any) => i.get('$state'),
            deps: ['$injector']
        }, {
            provide: 'translatorService',
            useFactory: (i: any) => i.get('TranslatorService'),
            deps: ['$injector']
        }, {
            provide: 'articleService',
            useFactory: (i: any) => i.get('ArticleService'),
            deps: ['$injector']
        }, {
            provide: 'blockService',
            useFactory: (i: any) => i.get('BlockService'),
            deps: ['$injector']
        }, {
            provide: 'profileService',
            useFactory: (i: any) => i.get('ProfileService'),
            deps: ['$injector']
        }, {
            provide: 'permissionService',
            useFactory: (i: any) => i.get('PermissionService'),
            deps: ['$injector']
        }, {
            provide: 'eventsHubService',
            useFactory: (i: any) => i.get('EventsHubService'),
            deps: ['$injector']
        }, {
            provide: '$uibModal',
            useFactory: (i: any) => i.get('$uibModal'),
            deps: ['$injector']
        }, {
            provide: '$scope',
            useFactory: (i: any) => i.get('$scope'),
            deps: ['$injector']
        }],
})
export class AppModule {
    ngDoBootstrap() {
    }
}
