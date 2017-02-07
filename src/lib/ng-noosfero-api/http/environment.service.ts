import { Injectable, Inject } from "ng-forward";
import { RestangularService } from "./restangular_service";


@Injectable()
@Inject("Restangular", "$q")
export class EnvironmentService extends RestangularService<noosfero.Environment> {

    private _currentEnvironmentPromise: ng.IDeferred<noosfero.Environment>;
    private _environment: noosfero.Environment;
    private now = new Date();
    constructor(private restangular: restangular.IService, $q: ng.IQService, $log: ng.ILogService) {
        super(restangular, $q, $log);
        this.resetCurrentEnvironment();
    }

    getResourcePath() {
        return "environment";
    }

    getDataKeys() {
        return {
            singular: 'environment',
            plural: 'environment'
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
        return this.restangular.one('environment', <any>environmentId);
    }

    getBoxes(environmentId: number | string): restangular.IPromise<any> {
        return this.getEnvironmentElement(environmentId).customGET('boxes');
    }

    getTags(environmentId: number | string): restangular.IPromise<any> {
        return this.getEnvironmentElement(environmentId).customGET('tags');
    }

    getEnvironmentPeople(environmentId: number | string, params?: any): restangular.IPromise<any> {
        return this.restangular.one('people').get(params);
    }
}
