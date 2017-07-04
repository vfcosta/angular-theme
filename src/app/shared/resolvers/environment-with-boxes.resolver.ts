import { EnvironmentService } from './../../../lib/ng-noosfero-api/http/environment.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class EnvironmentWithBoxesResolver implements Resolve<noosfero.Environment> {

    constructor(private environmentService: EnvironmentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let environment: noosfero.Environment;
        return this.environmentService.get('default').then((result: noosfero.RestResult<noosfero.Environment>) => {
            environment = result.data;
            this.environmentService.setCurrentEnvironment(environment);
            return this.environmentService.getBoxes(environment.id);
        }).then((response: any) => {
            environment.boxes = response.data;
            return environment;
        });
    }
}
