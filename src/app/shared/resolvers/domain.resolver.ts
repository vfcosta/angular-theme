import { DomainService } from './../../../lib/ng-noosfero-api/http/domain.service';
import { EnvironmentService } from './../../../lib/ng-noosfero-api/http/environment.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class DomainResolver implements Resolve<noosfero.Domain> {

    constructor(private domainService: DomainService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.domainService.get("context").then((result: noosfero.RestResult<noosfero.Domain>) => {
            return result.data;
        });
    }
}
