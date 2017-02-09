import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { UpgradeModule, downgradeInjectable } from '@angular/upgrade/static';
import { noosferoApp } from "./index";
import { noosferoRoutes } from "./routes";

platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
    const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
    upgrade.bootstrap(document.documentElement, [noosferoApp.name]);
});
angular.module('noosfero.init').config(noosferoRoutes);
