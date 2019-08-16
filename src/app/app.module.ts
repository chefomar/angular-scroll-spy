import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ScrollSpyModule } from 'ng-spy';
import { ContainerComponent } from './container/container.component';
import { CustomContainerExampleComponent } from './custom-container-example/custom-container-example.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContainerComponent,
    CustomContainerExampleComponent
  ],
  imports: [
    BrowserModule,
    ScrollSpyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
