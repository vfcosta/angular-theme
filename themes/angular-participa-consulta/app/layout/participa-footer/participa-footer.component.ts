import { ThemeFooterComponent } from 'app/layout/theme-footer/theme-footer.component';
import { Component } from '@angular/core';
import { Hotspot } from '../../../../../src/app/hotspot/hotspot.decorator';

@Component({
    selector: 'participa-footer',
    templateUrl: './participa-footer.html',
    styleUrls: ['./participa-footer.scss']
})
@Hotspot('theme_footer')
export class ParticipaFooterComponent {

}
