import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomChipComponent } from './custom-chip/custom-chip.component';
import { SelectedTagsComponent } from './custom-chip/selected-tags/selected-tags.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomChipComponent,
    SelectedTagsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
