import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  

import { AppComponent } from './app.component';
import { DatabaseService } from './services/database.service';
import { AuthService } from './services/auth.service';
@NgModule({
  declarations: [
      
  ],
  imports: [
    BrowserModule,  
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: []
})
export class AppModule { }
