import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { JokeDisplayComponent } from './joke-display/joke-display.component';
import { FavlistComponent } from './favlist/favlist.component';


@NgModule({
  declarations: [
    AppComponent,
    JokeDisplayComponent,
    FavlistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
