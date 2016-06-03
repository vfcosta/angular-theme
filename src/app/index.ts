import {bootstrap} from "ng-forward";
import {noosferoModuleConfig} from "./index.config";
import {noosferoAngularRunBlock} from "./index.run";
import {MainComponent} from "./main/main.component";
import {AuthEvents} from "./login/auth-events";

declare var moment: any;

angular.module('noosfero.init', []).config(noosferoModuleConfig).
    run(noosferoAngularRunBlock).
    constant("moment", moment).
    constant("AuthEvents", AuthEvents);
bootstrap(MainComponent);
