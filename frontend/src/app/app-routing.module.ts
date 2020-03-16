import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlayersComponent} from "./players/players.component";


const routes: Routes = [
  {path: '', component: PlayersComponent},
  {path: 'players', component: PlayersComponent},
  {path: 'clubs', component: PlayersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
