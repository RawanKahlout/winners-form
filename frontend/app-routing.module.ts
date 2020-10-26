import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DynamicFormComponent} from './dynamic-form/dynamic-form.component';
import { WinnersformComponent } from './winnersform/winnersform.component';
import {NotfoundComponent} from './notfound/notfound.component';
import {WinnersDataComponent }from './winners-data/winners-data.component';
import{SigninComponent} from './signin/signin.component';
import{CompetComponent}from './compet/compet.component';
import {SubmitPageComponent}from './submit-page/submit-page.component'
import { from } from 'rxjs';
const routes: Routes = [
{path : 'form-creation' , component: DynamicFormComponent} ,
{path:'winners-form/:cName' , component: WinnersformComponent},
{path :'winners-data/:id', component:WinnersDataComponent},
{path : 'signin', component:SigninComponent},
{path:'competitions-list' , component:CompetComponent},
{path:'Submited' , component:SubmitPageComponent},
{path:'',redirectTo:"signin",pathMatch: 'full'},
{path : '**' , component:NotfoundComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
export const routingPaths =[DynamicFormComponent ,WinnersformComponent,NotfoundComponent ,WinnersDataComponent,SigninComponent] ; 