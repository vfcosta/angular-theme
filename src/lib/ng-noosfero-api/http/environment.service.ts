import { Injectable, Inject } from "ng-forward";

@Injectable()
@Inject("Restangular", "$q")
export class EnvironmentService {


    private currentEnvironment: noosfero.Environment = null;
    constructor(private restangular: restangular.IService, private $q: ng.IQService) {

    }

    getCurrentEnvironment(): noosfero.Environment {
        return this.currentEnvironment;
    }


    getEnvironmentPeople(params: any): ng.IPromise<noosfero.Person[]> {
        let p = this.restangular.one('people').get(params);
        let deferred = this.$q.defer<noosfero.Person[]>();
        p.then(this.getHandleSuccessFunctionKeyArray<noosfero.Person[]>("people", deferred));
        p.catch(this.getHandleErrorFunction<noosfero.Person[]>(deferred));
        return deferred.promise;
    }

    get(identifier: string = 'default'): ng.IPromise<noosfero.Environment> {
        let p = this.restangular.one('environment').customGET(identifier);
        let deferred = this.$q.defer<noosfero.Environment>();
        if (identifier === 'default') {
            p.then((response) => {
                let data = this.restangular.stripRestangular(response.data);
                this.currentEnvironment = data;
                this.getHandleSuccessFunction<noosfero.Environment>(deferred).bind(this)(response);
            });
        } else {
            p.then(this.getHandleSuccessFunction<noosfero.Environment>(deferred));
        }

        p.catch(this.getHandleErrorFunction<noosfero.Environment>(deferred));
        return deferred.promise;
    }

    getBoxes(id: number) {
        let p = this.restangular.one('environments', id).customGET("boxes");
        let deferred = this.$q.defer<noosfero.Box[]>();
        p.then(this.getHandleSuccessFunctionKeyArray<noosfero.Box[]>("boxes", deferred));
        p.catch(this.getHandleErrorFunction<noosfero.Box[]>(deferred));
        return deferred.promise;
    }

    update(environment: noosfero.Environment) {
        let headers = { 'Content-Type': 'application/json' };
        let env = this.restangular.one('environment', environment.id);
        return env.customPOST({ environment: environment }, null, null, headers);
    }

    /** TODO - Please, use the base class RestangularService
     * (description)
     *
     * @template T_currentEnvironmentPromise
     * @param {ng.IDeferred<T>} deferred (description)
     * @returns {(response: restangular.IResponse) => void} (description)
     */
    getHandleErrorFunction<T>(deferred: ng.IDeferred<T>): (response: restangular.IResponse) => void {
        let self = this;
        /**
         * (description)
         *
         * @param {restangular.IResponse} response (description)
         */
        let errorFunction = (response: restangular.IResponse): void => {
            deferred.reject(response);
        };
        return errorFunction;
    }

    getTags(): ng.IPromise<{}> {
        let p = this.restangular.one('environment').customGET('tags');
        let deferred = this.$q.defer<{}>();
        p.then(this.getHandleSuccessFunction<{}>(deferred));
        p.catch(this.getHandleErrorFunction<{}>(deferred));
        return deferred.promise;
    }

    /**
     * TODO - use restangular service as base class, and this will not be necessary here anymore
     */
    protected getHandleSuccessFunction<C>(deferred: ng.IDeferred<C>, responseKey?: string): (response: restangular.IResponse) => void {
        let self = this;

        /**
         * (description)
         *
         * @param {restangular.IResponse} response (description)
         */
        let successFunction = (response: restangular.IResponse): void => {
            let data = this.restangular.stripRestangular(response.data);
            deferred.resolve(data);
        };
        return successFunction;
    }

    /**
     * TODO - use restangular service as base class, and this will not be necessary here anymore
     */
    protected getHandleSuccessFunctionKeyArray<C>(key: string, deferred: ng.IDeferred<C>, responseKey?: string): (response: restangular.IResponse) => void {
        let self = this;

        /**
         * (description)
         *
         * @param {restangular.IResponse} response (description)
         */
        let successFunction = (response: restangular.IResponse): void => {
            let data = this.restangular.stripRestangular(response.data[key]);
            deferred.resolve(data);
        };
        return successFunction;
    }
}
