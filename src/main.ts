/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app'; // Make sure this line exists and is correct

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));