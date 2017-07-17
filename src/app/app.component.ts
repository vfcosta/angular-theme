import { environment } from './../environments/environment';
import { BodyStateClassesService } from './shared/services/body-state-classes.service';
import { AfterViewInit, Inject, ViewEncapsulation, Component } from '@angular/core';
import * as utils from './shared/utils';

@Component({
  selector: 'noosfero-app',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {

    public themeSkin = 'skin-default';
    private appClasses = "";

    constructor(@Inject('Window') private window, private bodyStateClassesService: BodyStateClassesService) {
        bodyStateClassesService.start({
            skin: this.themeSkin
        });
        window['CKEDITOR_BASEPATH'] = `${environment.assetsPath}/ckeditor/`;
        utils.loadScript(`${environment.assetsPath}/ckeditor/ckeditor.js`);
    }

    ngAfterViewInit() {
        this.bodyStateClassesService.changeClasses.subscribe((classes: string[]) => {
            this.appClasses = classes.join(" ");
        });
    }
}
