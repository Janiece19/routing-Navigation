import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { FormService } from './shared/form-service';
import { AppComponent } from './app.component';
import { CrudComponent } from './component/crud/crud.component';

@NgModule({
  declarations: [
    AppComponent,
    CrudComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule 
  ],
  providers: [FormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
