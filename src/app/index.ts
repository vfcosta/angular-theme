import { LanguageSelectorComponent } from './layout/language-selector/language-selector.component';
import { FooterComponent } from './layout/footer/footer.component';
import { bundle, bootstrap, provide } from "ng-forward";
import { noosferoModuleConfig } from "./index.config";
import { noosferoAngularRunBlock } from "./index.run";
import { MainComponent } from "./main/main.component";
import { AuthEvents } from "./login/auth-events";

import { EVENTS_HUB_KNOW_EVENT_NAMES } from './shared/services/events-hub.service';
import { NoosferoKnownEvents } from './known-events';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UpgradeModule, downgradeInjectable } from '@angular/upgrade/static';
import { AppModule } from './app.module';
import { AuthService } from "./login/auth.service";
import { SessionService } from "./login/session.service";
import { NotificationService } from "./shared/services/notification.service";
import { BodyStateClassesService } from "./shared/services/body-state-classes.service";
import { downgradeComponent } from '@angular/upgrade/static';

declare var moment: any;

// FIXME see a better way to declare template modules for dev mode
try {
    angular.module('noosfero.templates.app');
} catch (error) {
    angular.module('noosfero.templates.app', []);
}
try {
    angular.module('noosfero.templates.plugins');
} catch (error) {
    angular.module('noosfero.templates.plugins', []);
}

angular.module('noosfero.init', ['noosfero.templates.app', 'noosfero.templates.plugins']).
    config(noosferoModuleConfig).
    run(noosferoAngularRunBlock).
    constant("moment", moment).
    constant("AuthEvents", AuthEvents).
    directive('noosferoFooter',
        downgradeComponent({component: FooterComponent}) as angular.IDirectiveFactory
    ).
    directive('languageSelector',
        downgradeComponent({component: LanguageSelectorComponent}) as angular.IDirectiveFactory
    );

platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
    const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
    let noosferoApp = bundle('noosferoApp', MainComponent, [
        provide(EVENTS_HUB_KNOW_EVENT_NAMES, { useClass: NoosferoKnownEvents })
    ]).publish();
    upgrade.bootstrap(document.documentElement, [noosferoApp.name]);
});
