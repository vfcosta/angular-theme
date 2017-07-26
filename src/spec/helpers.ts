import { MockBackend, MockConnection } from '@angular/http/testing';
import {ResponseOptions, Response, Http, Headers, RequestOptions, URLSearchParams, Request, RequestMethod, HttpModule, BaseRequestOptions} from "@angular/http";
import { RestangularModule, RestangularHttp, Restangular } from 'ngx-restangular';

export function provideMockBackend() {
    return <any>[
        BaseRequestOptions, MockBackend,
        {
            provide: RestangularHttp,
            useFactory: (http: Http) => {
                return new RestangularHttp(http);
            },
            deps: [Http]
        },
        {
            provide: Http,
            useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                return new Http(backendInstance, defaultOptions);
            },
            deps: [MockBackend, BaseRequestOptions]
        },
    ];
}

export function mockBackendConnection(backend: MockBackend, url, body: any = {}, headers: any = {}, status: number = 200) {
    backend.connections.subscribe((connection: MockConnection) => {
        if (connection.request.url === url) {
            const options = {
                // body: JSON.stringify(body),
                body: body,
                headers: new Headers(headers),
                status: status,
            };
            const response = new Response(new ResponseOptions(options));
            connection.mockRespond(response);
        }
    });
}

export {getMocks} from "./mocks";

export let fixtures = {
    user: {
        id: 1,
        login: 'user',
        email: 'user@company.com',
        person: <noosfero.Person>{
            id: 1,
            identifier: 'user'
        },
        private_token: 'token',
        userRole: 'admin',
        permissions: []
    }
};
