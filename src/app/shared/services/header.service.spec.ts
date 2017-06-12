import * as helpers from '../../../spec/helpers';
import { HeaderService } from "./header.service";

describe("Header Service", () => {
    let environmentService = jasmine.createSpyObj("EnvironmentService", ["getCurrentEnvironment"]);
    let resolveEnvironmentPromise;
    let environmentPromise = { then: (func: Function) => { resolveEnvironmentPromise = func; } };
    environmentService.getCurrentEnvironment = jasmine.createSpy("getCurrentEnvironment").and.returnValue(environmentPromise);

    let document = <any>{};
    let createComponent = (): HeaderService => {
        return new HeaderService(document, environmentService);
    };

    it("should set the header title element", () => {
        let component: HeaderService = createComponent();
        let titleElJq = jasmine.createSpyObj("titleElement", ["text"]);
        titleElJq.text = jasmine.createSpy("text");
        component["titleElement"] = titleElJq;
        resolveEnvironmentPromise({ id: 1, name: 'Noosfero' });
        expect(titleElJq.text).toHaveBeenCalledWith('Noosfero');
    });
});
