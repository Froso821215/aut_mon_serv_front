import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitComponent } from './pages/init/init.component';
import { CheckInstanciaComponent } from './pages/check-instancia/check-instancia.component';

const routes: Routes = [
  {path:'init',component:InitComponent},
  {path:'',component:InitComponent},
  {path:'check_inst',component:CheckInstanciaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
