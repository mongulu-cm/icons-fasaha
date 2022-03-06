import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MenuComponent } from './menu/menu.component';
import { SearchComponent } from './search/search.component';
import { IconCartComponent } from './icon-cart/icon-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    MenuComponent,
    SearchComponent,
    IconCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
