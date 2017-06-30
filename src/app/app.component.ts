import { BodyStateClassesService } from './shared/services/body-state-classes.service';
import { Component } from '@angular/core';

@Component({
  selector: 'noosfero-app',
  template: require('app/app.html')
})
export class AppComponent {

    public themeSkin: string = 'skin-default';

    constructor(bodyStateClassesService: BodyStateClassesService) {
        bodyStateClassesService.start({
            skin: this.themeSkin
        });
    }
}
