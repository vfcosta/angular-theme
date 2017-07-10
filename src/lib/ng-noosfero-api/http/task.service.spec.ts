import { TaskService } from "./task.service";
import { RestangularModule, RestangularHttp, Restangular } from 'ngx-restangular';
import { async, fakeAsync, tick, TestBed, ComponentFixture, flushMicrotasks } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {Http, Headers, RequestOptions, URLSearchParams, Request, RequestMethod, JsonpModule, HttpModule, BaseRequestOptions} from "@angular/http";
import { BrowserModule } from '@angular/platform-browser';
import * as helpers from "../../../spec/helpers";

describe("Services", () => {
    describe("Task Service", () => {
        let service: TaskService;
        let mocks = helpers.getMocks();

        beforeEach(async(() => {
            spyOn(mocks.sessionService, "destroy");
            TestBed.configureTestingModule({
                imports: [RestangularModule, BrowserModule, JsonpModule],
                providers: [
                    TaskService,
                ].concat(helpers.provideMockBackend())
            });
            TestBed.get(Restangular).provider.setFullResponse(true);
            TestBed.get(Restangular).provider.setBaseUrl("/api/v1");
            service = TestBed.get(TaskService);
        }));

        xdescribe("Succesfull requests", () => {

            it("list pending tasks", () => {
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/tasks?all_pending=true&content_type=AddMember,ApproveComment,ApproveArticle,AbuseComplaint,SuggestArticle,CreateCommunity,AddFriend&status=1`,
                    { tasks: [{ id: 1 }]}, {}, 200);
                service.getAllPending().then((result: noosfero.RestResult<noosfero.Task[]>) => {
                    expect(result.data).toEqual(<noosfero.Task[]>[{ id: 1 }]);
                });
            });

            it("finish a task", () => {
                let taskId = 1;
                let task: noosfero.Task = <any>{ id: taskId };
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/tasks/${taskId}/finish`, { task: { id: taskId } }, {}, 200);
                service.finishTask(task).then((result: noosfero.RestResult<noosfero.Task>) => {
                    expect(result.data).toEqual(<noosfero.Task>{ id: 1 });
                });
            });

            it("cancel a task", () => {
                let taskId = 1;
                let task: noosfero.Task = <any>{ id: taskId };
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/tasks/${taskId}/cancel`, { task: { id: taskId } }, {}, 200);
                service.cancelTask(task).then((result: noosfero.RestResult<noosfero.Task>) => {
                    expect(result.data).toEqual(<noosfero.Task>{ id: 1 });
                });
            });
        });

    });
});
