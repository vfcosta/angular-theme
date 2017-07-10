import { BodyStateClassesService } from './shared/services/body-state-classes.service';
import { ViewEncapsulation, Component } from '@angular/core';

@Component({
  selector: 'noosfero-app',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

    public themeSkin: string = 'skin-default';
    private appClasses = "";

    constructor(private bodyStateClassesService: BodyStateClassesService) {
        bodyStateClassesService.start({
            skin: this.themeSkin
        });
    }

    ngAfterViewInit() {
        this.bodyStateClassesService.changeClasses.subscribe((classes: string[]) => {
            this.appClasses = classes.join(" ");
        });
    }
}
