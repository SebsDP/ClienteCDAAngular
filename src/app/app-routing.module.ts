import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

//VideoGames
import { CreateComponent } from './components/vehicle/create-vehicle/create-vehicle.component';
import { ReadComponent } from './components/vehicle/read-vehicle/read-vehicle.component';
import { UpdateComponent } from './components/vehicle/update-vehicle/update-vehicle.component';
import { DeleteComponent } from './components/vehicle/delete-vehicle/delete-vehicle.component';

//Users
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { ReadUserComponent } from './components/user/read-user/read-user.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';
import { DeleteUserComponent } from './components/user/delete-user/delete-user.component';

export const routes: Routes = [

  {path:'home', component: HomeComponent},
  {path:'about', component:AboutComponent},

  {path:'create-vehicle', component: CreateComponent},
  {path:'read-vehicle/:id', component: ReadComponent},
  {path:'update-vehicle', component: UpdateComponent},
  {path:'delete-vehicle', component: DeleteComponent},

  {path:'create-user', component: CreateUserComponent},
  {path:'read-user', component: ReadUserComponent},
  {path:'update-user', component: UpdateUserComponent},
  {path:'delete-user', component: DeleteUserComponent},

  {path:'', pathMatch:'full', component: HomeComponent},
  {path:'**', pathMatch:'full', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
