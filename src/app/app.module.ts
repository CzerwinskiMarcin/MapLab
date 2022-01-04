import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SearchComponent } from './components/search/search.component';
import { LabMapComponent } from './components/lab-map/lab-map.component';
import { ResultComponent } from './components/result/result.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    LabMapComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LeafletModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
