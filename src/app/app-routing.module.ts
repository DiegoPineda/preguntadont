import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { TiendaPageComponent } from './pages/tienda-page/tienda-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes: Routes = [
  {path:"login", component:LoginPageComponent},
  {path: "tienda", component:TiendaPageComponent},
  {path: "registro", component:RegisterPageComponent},
  {path:"**", redirectTo:"login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
