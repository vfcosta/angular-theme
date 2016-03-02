namespace NgNoosferoAPI {
    export class NoosferoHttpClient {
        static $inject = ['$http', '$q'];

        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {

        }
    }

    NgNoosferoAPI.ngModule.service(NoosferoHttpClient);
}