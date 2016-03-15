/**
 * @name RestangularService
 * Base class to be extended by classes which will provide access
 * to te Noosfero REST API
 * 
 * @export RestangularService
 * @abstract
 * @class RestangularService
 * @template T
 */
export abstract class RestangularService<T extends noosfero.RestModel> {

    /**
     * Creates an instance of RestangularService.
     * 
     * @param {restangular.IService} Restangular (description)
     * @param {ng.IQService} $q (description)
     * @param {ng.ILogService} $log (description)
     */
    constructor(protected restangularService: restangular.IService, protected $q: ng.IQService, protected $log: ng.ILogService) {
        // TODO 
        this.restangularService.setResponseInterceptor((data, operation, what, url, response, deferred) => {
            let transformedData: any = data;
            if (operation === "getList" && url.endsWith("/" + this.getDataKeys().plural)) {
                transformedData = data[this.getDataKeys()["plural"]];
                return transformedData;
            } else {
                return data;
            }
        });
    }

    protected extractData(response: restangular.IResponse): noosfero.RestResult<T> {
        let dataKey: string;
        if (response.data && this.getDataKeys()) {
            if ((<Object>response.data).hasOwnProperty(this.getDataKeys().singular)) {
                dataKey = this.getDataKeys().singular;
            } else if ((<Object>response.data).hasOwnProperty(this.getDataKeys().plural)) {
                dataKey = this.getDataKeys().plural;
            }
        }
        return {
            data: response.data[dataKey],
            headers: response.headers
        };
    };

    protected buildResult(response: restangular.IResponse): noosfero.RestResult<T> {
        return {
            data: response.data,
            headers: response.headers
        };
    };
    /**
     * Abstract getPath() method is used to mount the url 
     * on REST Operations
     * @protected
     * @abstract
     * @returns {string} The path of the REST endpoint
     */
    public abstract getResourcePath(): string;

    /**
     * Abstract getDataKeys()
     * 
     * Should be implemented into the child classes and 
     * returns the singular and plural names of the represented resource
     * 
     * @protected
     * @abstract
     * @returns {{ singular: string, plural: string }} (description)
     */
    protected abstract getDataKeys(): { singular: string, plural: string };

    /**
     * Do a HTTP GET call to the resource represented using the id provided
     * 
     * @protected
     * @param {number} id The resource id
     * @returns {ng.IPromise<T>} Returns a Promise to the Generic Type 
     */
    public get(id: number, rootElement?: restangular.IElement, queryParams?: any, headers?: any): ng.IPromise<noosfero.RestResult<T>> {
        let deferred = this.$q.defer<noosfero.RestResult<T>>();

        let restRequest: ng.IPromise<noosfero.RestResult<T>>;

        if (rootElement) {
            restRequest = rootElement.one(this.getResourcePath(), id).get(queryParams, headers);
        } else {
            restRequest = this.restangularService.one(this.getResourcePath(), id).get(queryParams, headers);
        }

        restRequest.then(this.getHandleSuccessFunction(deferred))
            .catch(this.getHandleErrorFunction(deferred));


        return deferred.promise;
    }

    /**
     * Do a HTTP GET call to the resource collection represented
     * 
     * @protected
     * @param {number} id (description)
     * @returns {ng.IPromise<T>} Returns a Promise to the Generic Type 
     */
    public list(rootElement?: restangular.IElement, queryParams?: any, headers?: any): ng.IPromise<noosfero.RestResult<T>> {
        let deferred = this.$q.defer<noosfero.RestResult<T>>();

        let restRequest: ng.IPromise<any>;

        debugger;


        if (rootElement) {
            restRequest = rootElement.customGET(this.getResourcePath(), queryParams, headers);
        } else {
            restRequest = this.restangularService.all(this.getResourcePath()).customGET("", queryParams, headers);
        }


        restRequest
            .then(this.getHandleSuccessFunction(deferred))
            .catch(this.getHandleErrorFunction(deferred));


        return deferred.promise;
    }

    public listSubElements<C>(obj: T, subElement: string, queryParams?: any, headers?: any): ng.IPromise<noosfero.RestResult<C>> {
        let deferred = this.$q.defer<noosfero.RestResult<C>>();
        let restRequest: ng.IPromise<noosfero.RestResult<T>>;
        restRequest = obj.all(subElement).get(queryParams, headers);
        restRequest.then(this.getHandleSuccessFunction(deferred))
            .catch(this.getHandleErrorFunction(deferred));
        return deferred.promise;;
    }

    /**
     * Removes the object provided from the resource collection,
     * calls DELETE /resourcepath/:resourceId
     */
    public remove(obj: T, rootElement?: noosfero.RestModel, queryParams?: any, headers?: any): ng.IPromise<noosfero.RestResult<T>> {
        let restangularObj: restangular.IElement;



        if (rootElement) {
            restangularObj = rootElement.one(this.getResourcePath(), <string>obj.id);
        } else {
            restangularObj = this.restangularService.one(this.getResourcePath(), <string>obj.id);
        }

        let deferred = this.$q.defer<noosfero.RestResult<T>>();

        let restRequest: ng.IPromise<noosfero.RestResult<T>>;

        restRequest = restangularObj.remove(queryParams, headers);

        restRequest
            .then(this.getHandleSuccessFunction(deferred))
            .catch(this.getHandleErrorFunction(deferred));

        return deferred.promise;
    }

    /**
     * Updates the object into the resource collection
     * calls PUT /resourcePath/:resourceId   {object}
     */
    public update(obj: T, rootElement?: noosfero.RestModel, queryParams?: any, headers?: any): ng.IPromise<noosfero.RestResult<T>> {
        let deferred = this.$q.defer<noosfero.RestResult<T>>();

        let restRequest: ng.IPromise<noosfero.RestResult<T>>;

        let restangularObj: restangular.IElement;

        if (rootElement) {
            restangularObj = rootElement.one(this.getResourcePath(), <string>obj.id);
        } else {
            restangularObj = this.restangularService.one(this.getResourcePath(), <string>obj.id);
        }

        restRequest = restangularObj.put(queryParams, headers);

        restRequest.then(this.getHandleSuccessFunction(deferred))
            .catch(this.getHandleErrorFunction(deferred));

        return deferred.promise;
    }

    /**
     * Creates a new Resource into the resource collection
     * calls POST /resourcePath
     */
    public create(obj: T, rootElement?: noosfero.RestModel, queryParams?: any, headers?: any): ng.IPromise<noosfero.RestResult<T>> {
        let deferred = this.$q.defer<noosfero.RestResult<T>>();

        let restRequest: ng.IPromise<noosfero.RestResult<T>>;

        if (rootElement) {
            restRequest = rootElement.all(this.getResourcePath()).post(obj, queryParams, headers);
        } else {
            restRequest = this.restangularService.all(this.getResourcePath()).post(obj, queryParams, headers);
        }

        restRequest.then(this.getHandleSuccessFunction(deferred))
            .catch(this.getHandleErrorFunction(deferred));

        return deferred.promise;
    }

    /**
     * Returns a Restangular IElement representing the 
     */
    public getElement(id: number, rootElement?: noosfero.RestModel): noosfero.RestModel {
        if (rootElement) {
            return <noosfero.RestModel>rootElement.one(this.getResourcePath(), id);
        } else {
            return <noosfero.RestModel>this.restangularService.one(this.getResourcePath(), id);
        }
    }

    // /**
    //  * (description)
    //  * 
    //  * @protected
    //  * @template T
    //  * @param {restangular.IElement} elementRoot (description)
    //  * @param {*} [element] (description)
    //  * @param {string} [path] (description)
    //  * @param {*} [params] (description)
    //  * @param {*} [headers] (description)
    //  * @returns {ng.IPromise<T>} (description)
    //  */
    // protected post<T>(elementRoot: restangular.IElement, element?: any, path?: string, params?: any, headers?: any): ng.IPromise<T> {
    //     let deferred = this.$q.defer<T>();

    //     let postData = <any>{};
    //     postData[this.getDataKeys().singular] = element;

    //     this.customPOST(
    //         elementRoot,
    //         postData,
    //         this.getResourcePath(),
    //         {}
    //     )
    //         .then(this.getPostSuccessHandleFunction(deferred))
    //         .catch(this.getHandleErrorFunction(deferred));

    //     return deferred.promise;
    // }


    // protected customGET<C>(elementRoot: restangular.IElement, path?: string, params?: any, headers?: any): ng.IPromise<C> {
    //     let deferred = this.$q.defer<C>();
    //     if (headers) {
    //         headers['Content-Type'] = 'application/json';
    //     } else {
    //         headers = { 'Content-Type': 'application/json' };
    //     }
    //     elementRoot.customGET(path, params, headers)
    //         .then(this.getHandleSuccessFunction<C>(deferred))
    //         .catch(this.getHandleErrorFunction<C>(deferred));
    //     return deferred.promise;
    // }

    // /**
    //  * (description)
    //  * 
    //  * @protected
    //  * @param {restangular.IElement} elementRoot (description)
    //  * @param {*} [elem] (description)
    //  * @param {string} [path] (description)
    //  * @param {*} [params] (description)
    //  * @param {*} [headers] (description)
    //  * @returns (description)
    //  */
    // protected customPOST(elementRoot: restangular.IElement, elem?: any, path?: string, params?: any, headers?: any) {
    //     if (headers) {
    //         headers['Content-Type'] = 'application/json';
    //     } else {
    //         headers = { 'Content-Type': 'application/json' };
    //     }
    //     return elementRoot.customPOST(elem, path, params, headers);
    // }

    /** HANDLERS */
    protected getHandleSuccessFunction<C>(deferred: ng.IDeferred<noosfero.RestResult<C | T | any>>, responseKey?: string): (response: restangular.IResponse) => void {
        let self = this;

        /**
         * (description)
         * 
         * @param {restangular.IResponse} response (description)
         */
        let successFunction = (response: restangular.IResponse): void => {
            if (self.$log) {
                self.$log.debug("Request successfull executed", response.data, self, response);
            }
            deferred.resolve(<any>this.extractData(response));
            //deferred.resolve(this.buildResult(response));
        };
        return successFunction;
    }

    /**
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
        let successFunction = (response: restangular.IResponse): void => {
            if (self.$log) {
                self.$log.error("Error executing request", self, response);
            }
            deferred.reject(response);
        };
        return successFunction;
    }
    /** END HANDLERS */

    //     /**
    //      * (description)
    //      * 
    //      * @template T
    //      * @param {ng.IDeferred<T>} deferred (description)
    //      * @returns {(response: restangular.IResponse) => void} (description)
    //      */
    //     protected getPostSuccessHandleFunction<T>(deferred: ng.IDeferred<T>): (response: restangular.IResponse) => void {
    //         let self = this;
    //         /**
    //          * (description)
    //          * 
    //          * @param {restangular.IResponse} response (description)
    //          */
    //         let successFunction = (response: restangular.IResponse): void => {
    //             if (self.$log) {
    //                 self.$log.debug("Post successfully executed", self, response);
    //             }
    //             let data = response.data;
    // 
    //             if ((<Object>data).hasOwnProperty(self.getDataKeys().singular)) {
    //                 deferred.resolve(data[self.getDataKeys().singular]);
    //             } else {
    //                 deferred.resolve(data);
    //             }
    //         };
    //         return successFunction;
    //     }

}
