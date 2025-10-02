
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app.routing";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule
    
  ],
  declarations: [AppComponent],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
