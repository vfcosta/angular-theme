import { LanguageSelectorComponent } from './layout/language-selector/language-selector.component';
import { TranslatePipe } from './shared/pipes/translate-pipe';
import { FooterComponent } from './layout/footer/footer.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';

@NgModule({
    imports: [
        BrowserModule,
        UpgradeModule
    ],
    declarations: [
        FooterComponent,
        TranslatePipe,
        LanguageSelectorComponent
    ],
    entryComponents: [
        FooterComponent,
        LanguageSelectorComponent
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
    }],
})
export class AppModule {
    ngDoBootstrap() {
    }
}
