export abstract class RestangularWrapperService<T> {

    private lastResponse: restangular.IResponse;
    constructor(protected Restangular: restangular.IService, protected $q: ng.IQService, protected $log: ng.ILogService) {

    }

    protected abstract getPath(): string;

    protected abstract getDataKeys(): { singular: string, plural: string };

    protected get(id: number): restangular.IElement {
        return this.Restangular.one(this.getPath(), id);
    }

    protected post(elementRoot: restangular.IElement, element?: any, path?: string, params?: any, headers?: any): ng.IPromise<T> {
        let deferred = this.$q.defer<T>();

        this.customPOST(
            elementRoot,
            element,
            this.getPath(),
            {}
        )
            .then(this.getHandleSuccessFunction(deferred))
            .catch(this.getHandleErrorFunction(deferred));

        return deferred.promise;
    }

    protected customPOST(elementRoot: restangular.IElement, elem?: any, path?: string, params?: any, headers?: any) {
        if (headers) {
            headers['Content-Type'] = 'application/json';
        } else {
            headers = { 'Content-Type': 'application/json' };
        }
        return elementRoot.customPOST(elem, path, params, headers);
    }

    // TODO create a handle ErrorFactory too and move handleSuccessFactory and handleErrorFactory
    // to a base class (of course we will have to creates a base class too)
    getHandleSuccessFunction<C>(deferred: ng.IDeferred<C>, responseKey?: string): (response: restangular.IResponse) => void {
        let self = this;
        let successFunction = (response: restangular.IResponse): void => {
            if (self.$log) {
                self.$log.debug("Request successfull executed", self, response);
            }
            let data = response.data;

            let dataKey: string;

            if (data && self.getDataKeys()) {
                if ((<Object>data).hasOwnProperty(self.getDataKeys().singular)) {
                    data = data[self.getDataKeys().singular];
                    dataKey = self.getDataKeys().singular;
                } else if ((<Object>data).hasOwnProperty(self.getDataKeys().plural)) {
                    data = data[self.getDataKeys().plural];
                    dataKey = self.getDataKeys().plural;
                }
            }

            let result: any = {};
            result[dataKey] = data;
            result.headers = response.headers;
            deferred.resolve(result);
        };
        return successFunction;
    }

    getHandleErrorFunction<T>(deferred: ng.IDeferred<T>): (response: restangular.IResponse) => void {
        let self = this;
        let successFunction = (response: restangular.IResponse): void => {
            if (self.$log) {
                self.$log.error("Error executing request", self, response);
            }
            deferred.reject(response);
        };
        return successFunction;
    }
}
