import { PermissionService } from './permission.service';


describe("PermissionService", () => {

    // Profile TESTS
    it("check if a person has no permission if there is no permissions in object", (done) => {
        const permissionService: PermissionService = new PermissionService();
        const target = <noosfero.Profile>{ id: 1, identifier: "some" };
        expect(permissionService.isAllowed(target, null)).toBe(false);
        done();
    });

    it("check if a person has no permission if the permissions is null", (done) => {
        const permissionService: PermissionService = new PermissionService();
        const target = <noosfero.Profile>{ id: 1, identifier: "some", permissions: null };
        expect(permissionService.isAllowed(target, null)).toBe(false);
        done();
    });

    it("check if a person has no permission if the permissions is empty", (done) => {
        const permissionService: PermissionService = new PermissionService();
        const target = <noosfero.Profile>{ id: 1, identifier: "some", permissions: [] };
        expect(permissionService.isAllowed(target, null)).toBe(false);
        done();
    });

    it("check person has no permission if permissions has no element named like permission desired", (done) => {
        const permissionService: PermissionService = new PermissionService();
        const target = <noosfero.Profile>{ id: 1, identifier: "some", permissions: ['another_permission'] };
        expect(permissionService.isAllowed(target, 'some_permission')).toBe(false);
        done();
    });

    it("check person has permission if permissions has the element named like permission desired", (done) => {
        const permissionService: PermissionService = new PermissionService();
        const target = <noosfero.Profile>{ id: 1, identifier: "some", permissions: ['some_permission'] };
        expect(permissionService.isAllowed(target, 'some_permission')).toBe(true);
        done();
    });

    it("check person has permission if permissions has some element named like permission desired", (done) => {
        const permissionService: PermissionService = new PermissionService();
        const target = <noosfero.Profile>{ id: 1, identifier: "some", permissions: ['another', 'some_permission'] };
        expect(permissionService.isAllowed(target, 'some_permission')).toBe(true);
        done();
    });


    // Comment TESTS
    it("check if a person has no permission if there is no permissions in object", (done) => {
        const permissionService: PermissionService = new PermissionService();
        const target = <noosfero.Comment>{ id: 1 };
        expect(permissionService.isAllowed(target, null)).toBe(false);
        done();
    });

    it("check if a person has no permission if the permissions is null", (done) => {
        const permissionService: PermissionService = new PermissionService();
        const target = <noosfero.Comment>{ id: 1, permissions: null };
        expect(permissionService.isAllowed(target, null)).toBe(false);
        done();
    });

    it("check if a person has no permission if the permissions is empty", (done) => {
        const permissionService: PermissionService = new PermissionService();
        const target = <noosfero.Comment>{ id: 1,  permissions: [] };
        expect(permissionService.isAllowed(target, null)).toBe(false);
        done();
    });

    it("check person has no permission if permissions has no element named like permission desired", (done) => {
        const permissionService: PermissionService = new PermissionService();
        const target = <noosfero.Comment>{ id: 1,  permissions: ['another_permission'] };
        expect(permissionService.isAllowed(target, 'some_permission')).toBe(false);
        done();
    });

    it("check person has permission if permissions has the element named like permission desired", (done) => {
        const permissionService: PermissionService = new PermissionService();
        const target = <noosfero.Comment>{ id: 1,  permissions: ['some_permission'] };
        expect(permissionService.isAllowed(target, 'some_permission')).toBe(true);
        done();
    });

    it("check person has permission if permissions has some element named like permission desired", (done) => {
        const permissionService: PermissionService = new PermissionService();
        const target = <noosfero.Comment>{ id: 1,  permissions: ['another', 'some_permission'] };
        expect(permissionService.isAllowed(target, 'some_permission')).toBe(true);
        done();
    });

    // Article TESTS
    it("check if a person has no permission if there is no permissions in object", (done) => {
        const permissionService: PermissionService = new PermissionService();
        const target = <noosfero.Article>{ id: 1  };
        expect(permissionService.isAllowed(target, null)).toBe(false);
        done();
    });

    it("check if a person has no permission if the permissions is null", (done) => {
        const permissionService: PermissionService = new PermissionService();
        const target = <noosfero.Article>{ id: 1, permissions: null };
        expect(permissionService.isAllowed(target, null)).toBe(false);
        done();
    });

    it("check if a person has no permission if the permissions is empty", (done) => {
        const permissionService: PermissionService = new PermissionService();
        const target = <noosfero.Article>{ id: 1,  permissions: [] };
        expect(permissionService.isAllowed(target, null)).toBe(false);
        done();
    });

    it("check person has no permission if permissions has no element named like permission desired", (done) => {
        const permissionService: PermissionService = new PermissionService();
        const target = <noosfero.Article>{ id: 1,  permissions: ['another_permission'] };
        expect(permissionService.isAllowed(target, 'some_permission')).toBe(false);
        done();
    });

    it("check person has permission if permissions has the element named like permission desired", (done) => {
        const permissionService: PermissionService = new PermissionService();
        const target = <noosfero.Article>{ id: 1, permissions: ['some_permission'] };
        expect(permissionService.isAllowed(target, 'some_permission')).toBe(true);
        done();
    });

    it("check person has permission if permissions has some element named like permission desired", (done) => {
        const permissionService: PermissionService = new PermissionService();
        const target = <noosfero.Article>{ id: 1,  permissions: ['another', 'some_permission'] };
        expect(permissionService.isAllowed(target, 'some_permission')).toBe(true);
        done();
    });


});
