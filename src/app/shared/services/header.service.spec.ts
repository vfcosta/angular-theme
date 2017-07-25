import { Title } from '@angular/platform-browser';
import { EnvironmentService } from './../../../lib/ng-noosfero-api/http/environment.service';
import { EventEmitter } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture, flushMicrotasks } from '@angular/core/testing';
import * as helpers from '../../../spec/helpers';
import { HeaderService } from './header.service';

describe("Header Service", () => {
    let mocks = helpers.getMocks();
    let service: HeaderService;
    let titleService;

    beforeEach(async(() => {
        spyOn(mocks.environmentService, "getCurrentEnvironment").and.returnValue(Promise.resolve({ id: 1, name: 'Noosfero' }));
        TestBed.configureTestingModule({
            providers: [
                HeaderService,
                { provide: EnvironmentService, useValue: mocks.environmentService },
            ]
        });
        service = TestBed.get(HeaderService);
        titleService = TestBed.get(Title);
        spyOn(titleService, "setTitle");
    }));

    it("should set the header title element", fakeAsync(() => {
        tick();
        expect(titleService.setTitle).toHaveBeenCalledWith('Noosfero');
    }));
});
