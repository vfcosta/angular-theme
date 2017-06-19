import { Restangular } from 'ngx-restangular';
import { Injectable, Inject } from "@angular/core";
import { RestangularService } from "./restangular_service.ng2";

@Injectable()
export class EnvironmentService extends RestangularService<noosfero.Environment> {

    private _currentEnvironmentPromise: ng.IDeferred<noosfero.Environment>;
    private _environment: noosfero.Environment;

    constructor(protected restangular: Restangular) {
        super(restangular);
        this.resetCurrentEnvironment();
    }

    getResourcePath() {
        return "environments";
    }

    getDataKeys() {
        return {
            singular: 'environment',
            plural: 'environments'
        };
    }

    private resetCurrentEnvironment() {
        this.resetCurrent();
    }

    getCurrentEnvironment(): Promise<noosfero.Environment> {
        return this.getCurrent();
    }

    setCurrentEnvironment(environment: noosfero.Environment) {
        this.setCurrent(environment);
    }

    getEnvironmentElement(environmentId: number | string) {
        return this.restangular.one('environments', <any>environmentId);
    }

    getBoxes(environmentId: number | string): restangular.IPromise<restangular.IResponse> {
        return this.getEnvironmentElement(environmentId).customGET('boxes').toPromise();
    }

    getTags(environmentId: number | string): restangular.IPromise<any> {
        return this.getEnvironmentElement(environmentId).customGET('tags').toPromise();
    }

    getEnvironmentPeople(environmentId: number | string, params?: any): restangular.IPromise<any> {
        return this.getEnvironmentElement(environmentId).customGET('people', params).toPromise();
    }

    update(environment: noosfero.Environment) {
        let headers = { 'Content-Type': 'application/json' };
        return this.getEnvironmentElement(environment.id).customPOST({ environment: environment }, null, null, headers).toPromise();
    }
}
