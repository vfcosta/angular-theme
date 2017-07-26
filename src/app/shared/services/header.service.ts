import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { EnvironmentService } from '../../../lib/ng-noosfero-api/http/environment.service';

@Injectable()
export class HeaderService {
    environment: noosfero.Environment;

    constructor(private titleService: Title,
        private environmentService: EnvironmentService) {

        environmentService.getCurrentEnvironment().then((environment: noosfero.Environment) => {
            this.environment = environment;
            this.titleService.setTitle(this.environment.name);
        });
    }
}
