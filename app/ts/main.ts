import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';

const platform = platformBrowserDynamic();
//this is the component you want to boot strap
platform.bootstrapModule(AppModule); 