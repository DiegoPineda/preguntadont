import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { TiendaPageComponent } from './pages/tienda-page/tienda-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardPartidasComponent } from './components/dashboard-partidas/dashboard-partidas.component';
import { BackgroundComponent } from './shared/background/background.component';
import { HttpClientModule } from '@angular/common/http';
import { PlayComponent } from './components/play/play.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayPageComponent } from './pages/play-page/play-page.component';
import { PartidaComponent } from './components/partida/partida.component';
import { PartidaPageComponent } from './pages/partida-page/partida-page.component';
import { PreguntaComponent } from './components/pregunta/pregunta.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HomePageComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    TiendaComponent,
    TiendaPageComponent,
    DashboardPartidasComponent,
    BackgroundComponent,
    PlayComponent,
    PlayPageComponent,
    PartidaComponent,
    PartidaPageComponent,
    PreguntaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

