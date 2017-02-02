import { LanguageSelectorComponent } from './layout/language-selector/language-selector.component';
import { TranslatePipe } from './shared/pipes/translate-pipe';
import { FooterComponent } from './layout/footer/footer.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';

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
        StatisticsBlockComponent
    ],
    entryComponents: [
        FooterComponent,
        LanguageSelectorComponent,
        RawHTMLBlockComponent,
        StatisticsBlockComponent
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
        }],
})
export class AppModule {
    ngDoBootstrap() {
    }
}
