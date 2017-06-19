import { EventEmitter, Inject } from "@angular/core";
import { Restangular } from 'ngx-restangular';

/**
 * @name Restangular
 * Base class to be extended by classes which will provide access
 * to te Noosfero REST API
 *
 * @export Restangular
 * @abstract
 * @class Restangular
 * @template T
 */
export abstract class RestangularService<T extends noosfero.RestModel> {

    private baseResource: any;
    private currentPromise: Promise<T>;
    private resolveCurrentPromise;

    protected modelFoundEventEmitter: EventEmitter<T> = new EventEmitter<any>();
    protected modelAddedEventEmitter: EventEmitter<T> = new EventEmitter<any>();
    protected modelRemovedEventEmitter: EventEmitter<T> = new EventEmitter<any>();
    protected modelUpdatedEventEmitter: EventEmitter<T> = new EventEmitter<any>();

    /**
     * Creates an instance of Restangular.
     *
     * @param {Restangular} Restangular (description)
     */
    constructor(protected restangular: Restangular) {
        this.baseResource = restangular.all(this.getResourcePath());
        this.resetCurrent();
    }

    subscribeToModelRemoved(fn: ((model: T) => void)) {
        this.modelRemovedEventEmitter.subscribe(fn);
    }

    subscribeToModelAdded(fn: ((model: T) => void)) {
        this.modelAddedEventEmitter.subscribe(fn);
    }

    subscribeToModelUpdated(fn: ((model: T) => void)) {
        this.modelUpdatedEventEmitter.subscribe(fn);
    }

    subscribeToModelFound(fn: ((model: T) => void)) {
        this.modelFoundEventEmitter.subscribe(fn);
    }

    public resetCurrent() {
        this.currentPromise = new Promise((resolve, reject) => {
            this.resolveCurrentPromise = resolve;
        });
    }

    public getCurrent(): Promise<T> {
        return this.currentPromise;
    }

    public setCurrent(object: T) {
        this.resolveCurrentPromise(object);
    }

    protected extractData(response: restangular.IResponse): noosfero.RestResult<any> {
        let dataKey: string;
        if (response.data && this.getDataKeys()) {
            if ((<Object>response.data).hasOwnProperty(this.getDataKeys().singular)) {
                dataKey = this.getDataKeys().singular;
            } else if ((<Object>response.data).hasOwnProperty(this.getDataKeys().plural)) {
                dataKey = this.getDataKeys().plural;
            }
        }
        return {
            data: (response.data[dataKey] || response.data),
            headers: response.headers,
            status: response.status
        };
    };

    protected buildResult(response: restangular.IResponse): noosfero.RestResult<T> {
        return {
            data: response.data,
            headers: response.headers,
            status: response.status
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
    public get(id: number | string, rootElement?: restangular.IElement, queryParams?: any, headers?: any): ng.IPromise<noosfero.RestResult<T>> {
        let restRequest: any;
        if (rootElement) {
            restRequest = rootElement.one(this.getResourcePath(), <any>id).get(queryParams, headers);
        } else {
            restRequest = this.restangular.one(this.getResourcePath(), <any>id).get(queryParams, headers);
        }
        return restRequest.toPromise().then(this.getHandleSuccessFunction(this.modelFoundEventEmitter));
    }

    /**
     * Do a HTTP GET call to the resource collection represented
     *
     * @protected
     * @param {number} id (description)
     * @returns {ng.IPromise<T>} Returns a Promise to the Generic Type
     */
    public list(rootElement?: any, queryParams?: any, headers?: any): ng.IPromise<noosfero.RestResult<T[]>> {
        let restRequest: any;
        if (rootElement) {
            restRequest = rootElement.customGET(this.getResourcePath(), queryParams, headers);
        } else {
            restRequest = this.baseResource.customGET("", queryParams, headers);
        }
        return restRequest.toPromise().then(this.getHandleSuccessFunction());
    }

    /**
     * Do a HTTP GET call to the resource collection represented
     *
     * @protected
     * @param {number} id (description)
     * @returns {ng.IPromise<T>} Returns a Promise to the Generic Type
     */
    public getSub(rootElement?: restangular.IElement, queryParams?: any, headers?: any): ng.IPromise<noosfero.RestResult<T>> {
        let restRequest: any;
        if (rootElement) {
            restRequest = rootElement.customGET(this.getResourcePath(), queryParams, headers);
        } else {
            restRequest = this.baseResource.customGET("", queryParams, headers);
        }
        return restRequest.toPromise().then(this.getHandleSuccessFunction());
    }

    public listSubElements<C>(obj: T, subElement: string, queryParams?: any, headers?: any): ng.IPromise<noosfero.RestResult<C>> {
        let restRequest: any;
        let objElement = this.getElement(obj.id);
        objElement.id = obj.id;
        restRequest = objElement.customGET(subElement, queryParams, headers);
        return restRequest.toPromise().then(this.getHandleSuccessFunction());
    }

    /**
     * Removes the object provided from the resource collection,
     * calls DELETE /resourcepath/:resourceId
     */
    public remove(obj: T, rootElement?: noosfero.RestModel, queryParams?: any, headers?: any): ng.IPromise<noosfero.RestResult<T>> {
        let restangularObj: restangular.IElement;
        if (rootElement) {
            restangularObj = rootElement.one(this.getResourcePath(), obj.id);
        } else {
            restangularObj = this.restangular.one(this.getResourcePath(), obj.id);
        }
        let restRequest: any;
        restRequest = restangularObj.remove(queryParams, headers);
        return restRequest.toPromise().then(this.getHandleSuccessFunction(this.modelRemovedEventEmitter, obj));
    }

    /**
     * Updates the object into the resource collection
     * calls PUT /resourcePath/:resourceId   {object}
     */
    public update(obj: T, rootElement?: noosfero.RestModel, queryParams?: any, headers?: any): ng.IPromise<noosfero.RestResult<T>> {
        let restRequest: any;
        let restangularObj: restangular.IElement;

        if (rootElement) {
            restangularObj = rootElement.one(this.getResourcePath(), obj.id);
        } else {
            restangularObj = this.restangular.one(this.getResourcePath(), obj.id);
        }
        restRequest = restangularObj.put(queryParams, headers);
        return restRequest.toPromise().then(this.getHandleSuccessFunction(this.modelUpdatedEventEmitter));
    }

    /**
     * Creates a new Resource into the resource collection
     * calls POST /resourcePath
     */
    public create(obj: T, rootElement?: noosfero.RestModel, queryParams?: any, headers?: any, isSub: boolean = true, path?: string): ng.IPromise<noosfero.RestResult<T>> {
        let restRequest: any;

        let data = <any>{};
        if (isSub) {
            data[this.getDataKeys().singular] = obj;
        } else {
            data = obj;
        }

        let subpath = path || this.getResourcePath();
        if (rootElement) {
            restRequest = rootElement.all(subpath).post(data, queryParams, headers);
        } else {
            restRequest = this.baseResource.post(data, queryParams, headers);
        }
        return restRequest.toPromise().then(this.getHandleSuccessFunction(this.modelAddedEventEmitter));
    }

    public patch(data?: any, headers?: any): ng.IPromise<noosfero.RestResult<T>> {
        let restRequest = this.baseResource.patch(data, headers);
        return restRequest.toPromise().then(this.getHandleSuccessFunction());
    }

    public post(path: string, rootElement?: restangular.IElement, data?: any, headers?: any): ng.IPromise<noosfero.RestResult<T>> {
        let restRequest: any;
        if (rootElement) {
            restRequest = rootElement.customPOST(data, path, null, headers);
        } else {
            restRequest = this.baseResource.customPOST(data, path, headers);
        }
        return restRequest.toPromise().then(this.getHandleSuccessFunction());
    }

    /**
     * Returns a Restangular IElement representing the
     */
    public getElement(id: number, rootElement?: noosfero.RestModel) {
        if (rootElement) {
            return rootElement.one(this.getResourcePath(), id);
        } else {
            return this.restangular.one(this.getResourcePath(), id);
        }
    }

    /** HANDLERS */
    protected getHandleSuccessFunction<C>(successEmitter: EventEmitter<T> = null, currentModel: T = null): (response: restangular.IResponse) => noosfero.RestResult<any> {
        /**
         * (description)
         *
         * @param {restangular.IResponse} response (description)
         */
        let successFunction = (response: restangular.IResponse) => {
            let resultModel: noosfero.RestResult<T> = <any>this.extractData(response);
            // emits the event if a successEmiter was provided in the successEmitter parameter
            if (successEmitter !== null) {
                if (successEmitter !== this.modelRemovedEventEmitter) {
                    successEmitter.next(resultModel.data);
                } else {
                    successEmitter.next(currentModel !== null ? currentModel : resultModel.data);
                }
            }
            // resolve the promise with the model returned from the Noosfero API
            return resultModel;
        };
        return successFunction;
    }
}
