import { TaskService } from "./task.service";


describe("Services", () => {

    describe("Task Service", () => {

        let $httpBackend: ng.IHttpBackendService;
        let taskService: TaskService;

        beforeEach(angular.mock.module("main", ($translateProvider: angular.translate.ITranslateProvider) => {
            $translateProvider.translations('en', {});
        }));

        beforeEach(inject((_$httpBackend_: ng.IHttpBackendService, _TaskService_: TaskService) => {
            $httpBackend = _$httpBackend_;
            taskService = _TaskService_;
        }));


        describe("Succesfull requests", () => {

            it("list pending tasks", (done) => {
                $httpBackend.expectGET(`/api/v1/tasks?all_pending=true&status=1`).respond(200, { tasks: [{ id: 1 }] });
                taskService.getAllPending().then((result: noosfero.RestResult<noosfero.Task[]>) => {
                    expect(result.data).toEqual([{ id: 1 }]);
                    done();
                });
                $httpBackend.flush();
            });

            it("finish a task", (done) => {
                let taskId = 1;
                let task: noosfero.Task = <any>{ id: taskId };
                $httpBackend.expectPUT(`/api/v1/tasks/${taskId}/finish`).respond(200, { task: { id: taskId } });
                taskService.finishTask(task).then((result: noosfero.RestResult<noosfero.Task>) => {
                    expect(result.data).toEqual({ id: 1 });
                    done();
                });
                $httpBackend.flush();
            });

            it("cancel a task", (done) => {
                let taskId = 1;
                let task: noosfero.Task = <any>{ id: taskId };
                $httpBackend.expectPUT(`/api/v1/tasks/${taskId}/cancel`).respond(200, { task: { id: taskId } });
                taskService.cancelTask(task).then((result: noosfero.RestResult<noosfero.Task>) => {
                    expect(result.data).toEqual({ id: 1 });
                    done();
                });
                $httpBackend.flush();
            });
        });

    });
});
