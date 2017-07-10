import { EnvironmentService } from './../lib/ng-noosfero-api/http/environment.service';
import { SessionService } from './login/session.service';
import { AuthService } from './login/auth.service';
import { HeaderService } from './shared/services/header.service';
import * as helpers from '../spec/helpers';
import { BodyStateClassesService } from './shared/services/body-state-classes.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeHeaderComponent } from './layout/theme-header/theme-header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { ThemeFooterComponent } from './layout/theme-footer/theme-footer.component';
import { NgProgressModule } from 'ngx-progressbar';
import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const mocks = helpers.getMocks();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, ThemeHeaderComponent, ThemeFooterComponent, NavbarComponent, FooterComponent
      ],
      imports: [
        NgProgressModule, RouterTestingModule, TranslateModule.forRoot()
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: BodyStateClassesService, useValue: mocks.bodyStateClassesService },
        { provide: HeaderService, useValue: mocks.headerService },
        { provide: AuthService, useValue: mocks.authService },
        { provide: SessionService, useValue: mocks.sessionService },
        { provide: EnvironmentService, useValue: mocks.environmentService },
        { provide: 'Window', useValue: mocks.window },
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render navbar', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.navbar')).toBeDefined();
  }));
});
