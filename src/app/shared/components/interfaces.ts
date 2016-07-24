export interface IComponentWithPermissions {
    permissions: () => string[];
}

export interface IModalComponent {
    $uibModal: ng.ui.bootstrap.IModalService;
    modalInstance: ng.ui.bootstrap.IModalServiceInstance;
}

export interface IErrorMessages extends ng.IScope {
  errorMessages: any;
}
