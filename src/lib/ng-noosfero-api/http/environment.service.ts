import { Injectable, Inject } from "ng-forward";

@Injectable()
@Inject("Restangular", "$q")
export class EnvironmentService {

    private _currentEnvironmentPromise: ng.IDeferred<noosfero.Environment>;

    constructor(private restangular: restangular.IService, private $q: ng.IQService) {
        
    }

    getEnvironmentPeople(params: any) : ng.IPromise<noosfero.Person[]> {
        let p = this.restangular.one('people').get(params);
        let deferred = this.$q.defer<noosfero.Person[]>();
        p.then(this.getHandleSuccessFunctionKeyArray<noosfero.Person[]>("people", deferred));
        p.catch(this.getHandleErrorFunction<noosfero.Person[]>(deferred));
        return deferred.promise;        
    }

    getByIdentifier(identifier: string): ng.IPromise<noosfero.Environment> {
        console.debug("Getting the current environment by identifier in service: " + identifier);
        let p = this.restangular.one('environment').customGET(identifier);
        console.debug("Return promise: ", p);
                
        let deferred = this.$q.defer<noosfero.Environment>();
        p.then(this.getHandleSuccessFunction<noosfero.Environment>(deferred));
        p.catch(this.getHandleErrorFunction<noosfero.Environment>(deferred));
        return deferred.promise;
    }
    
    getBoxes(id: number) {
        console.debug("Getting the environment [${id}] boxes in service", id);
        let p = this.restangular.one('environments', id).customGET("boxes");
        console.debug("Return boxes promise in service: ", p);
                
        let deferred = this.$q.defer<noosfero.Box[]>();
        p.then(this.getHandleSuccessFunctionKeyArray<noosfero.Box[]>("boxes", deferred));
        p.catch(this.getHandleErrorFunction<noosfero.Box[]>(deferred));
        return deferred.promise;
    }
    
    /** TODO - Please, use the base class RestangularService
     * (description)
     * 
     * @template T
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
            let data = this.restangular.stripRestangular(response.data)
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
