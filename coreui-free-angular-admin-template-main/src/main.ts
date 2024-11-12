/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/admin/app.component';
import { appConfig } from './app/admin/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));

