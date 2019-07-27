import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TargetComponent } from './target/target.component';
import { ScrollSpyModule } from 'scroll-spy';
import { ContainerComponent } from './container/container.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TargetComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    ScrollSpyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
