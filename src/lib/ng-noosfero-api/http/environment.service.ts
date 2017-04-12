import { Injectable, Inject } from "ng-forward";
import { RestangularService } from "./restangular_service";


@Injectable()
@Inject("Restangular", "$q")
export class EnvironmentService extends RestangularService<noosfero.Environment> {

    private _currentEnvironmentPromise: ng.IDeferred<noosfero.Environment>;
    private _environment: noosfero.Environment;

    constructor(private restangular: restangular.IService, $q: ng.IQService, $log: ng.ILogService) {
        super(restangular, $q, $log);
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
        this._currentEnvironmentPromise = this.$q.defer();
    }

    getCurrentEnvironment(): ng.IPromise<noosfero.Environment> {
        return this._currentEnvironmentPromise.promise;
    }

    setCurrentEnvironment(environment: noosfero.Environment) {
        this._currentEnvironmentPromise.resolve(environment);
    }

    getEnvironmentElement(environmentId: number | string): restangular.IElement {
        return this.restangular.one('environments', <any>environmentId);
    }

    getBoxes(environmentId: number | string): restangular.IPromise<restangular.IResponse> {
        return this.getEnvironmentElement(environmentId).customGET('boxes');
    }

    getTags(environmentId: number | string): restangular.IPromise<any> {
        return this.getEnvironmentElement(environmentId).customGET('tags');
    }

    getEnvironmentPeople(environmentId: number | string, params?: any): restangular.IPromise<any> {
        return this.getEnvironmentElement(environmentId).customGET('people', params);
    }

    update(environment: noosfero.Environment) {
        let headers = { 'Content-Type': 'application/json' };
        return this.getEnvironmentElement(environment.id).customPOST({ environment: environment }, null, null, headers);
    }
}
