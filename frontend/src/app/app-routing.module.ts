import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlayersComponent} from "./players/players.component";
import {PlayerComponent} from "./player/player.component";
import {ClubsComponent} from "./clubs/clubs.component";
import {ClubComponent} from "./club/club.component";
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign-up/sign-up.component";


const routes: Routes = [
  {path: '', component: PlayersComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'players', component: PlayersComponent},
  {path: 'clubs', component: ClubsComponent},
  {path: 'player/:id', component: PlayerComponent},
  {path: 'club/:name', component: ClubComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
