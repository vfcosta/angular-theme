import { EnvironmentService } from './../../../lib/ng-noosfero-api/http/environment.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class EnvironmentResolver implements Resolve<noosfero.Environment> {

    constructor(private environmentService: EnvironmentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.environmentService.get('default').then((result: noosfero.RestResult<noosfero.Environment>) => {
            this.environmentService.setCurrentEnvironment(result.data);
            return result.data;
        });
    }
}
