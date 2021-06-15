import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import{HttpClient, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule , routingPaths} from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import {ReactiveFormsModule , FormsModule} from '@angular/forms';
import { WinnersformComponent } from './winnersform/winnersform.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { WinnersDataComponent } from './winners-data/winners-data.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CompetComponent } from './compet/compet.component';
import { SigninComponent } from './signin/signin.component';
import { MainnavComponent } from './mainnav/mainnav.component';
import {MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { SubmitPageComponent } from './submit-page/submit-page.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import{MatInputModule}from '@angular/material/input';
import { EditWinnersFormComponent } from './edit-winners-form/edit-winners-form.component'
@NgModule({
  declarations: [
    AppComponent,
    DynamicFormComponent,
    routingPaths,
    WinnersformComponent,
    NotfoundComponent,
    WinnersDataComponent,
    CompetComponent,
    SigninComponent,
    MainnavComponent,
    SubmitPageComponent,
    EditWinnersFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule
    
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
