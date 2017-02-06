export namespace UpgradeUtils {

  export function provideAngular1Services(services) {
    let providers = [];
    for (let service of services) {
      let serviceName = service.charAt(0).toLowerCase() + service.slice(1);
      providers.push({
        provide: serviceName,
        useFactory: (i: any) => i.get(service),
        deps: ['$injector']
      });
    }
    return providers;
  }
}