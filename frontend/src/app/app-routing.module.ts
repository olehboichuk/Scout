import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PlayersComponent} from "./players/players.component";
import {PlayerComponent} from "./player/player.component";
import {ClubsComponent} from "./clubs/clubs.component";
import {ClubComponent} from "./club/club.component";
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {AddPlayerComponent} from "./add-player/add-player.component";
import {AddClubComponent} from "./add-club/add-club.component";
import {AddTournamentComponent} from "./add-tournament/add-tournament.component";
import {TournamentComponent} from "./tournament/tournament.component";
import {TournamentsComponent} from "./tournaments/tournaments.component";


const routes: Routes = [
  {path: '', component: PlayersComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'players', component: PlayersComponent},
  {path: 'tournaments', component: TournamentsComponent},
  {path: 'add-player', component: AddPlayerComponent},
  {path: 'add-club', component: AddClubComponent},
  {path: 'add-tournament', component: AddTournamentComponent},
  {path: 'clubs', component: ClubsComponent},
  {path: 'player/:id', component: PlayerComponent},
  {path: 'club/:name', component: ClubComponent},
  {path: 'tournament/:name', component: TournamentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
