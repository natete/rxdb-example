import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DatabaseService } from './shared/database/database.service';
import { HeroService } from './hero/hero.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    DatabaseService,
    HeroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
