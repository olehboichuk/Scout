import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {PlayersComponent} from './players/players.component';
import {ToolBarComponent} from './tool-bar/tool-bar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {DialogDelete, PlayerComponent} from './player/player.component';
import {ClubsComponent} from './clubs/clubs.component';
import {ClubComponent} from './club/club.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {AuthInterceptor} from "./services/AuthInterceptor";
import {SignUpComponent} from './sign-up/sign-up.component';
import {MatIconModule} from "@angular/material/icon";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSortModule} from "@angular/material/sort";
import {MatExpansionModule} from "@angular/material/expansion";
import { AddPlayerComponent } from './add-player/add-player.component';
import {DatePipe} from "@angular/common";
import {Ng5SliderModule} from "ng5-slider";
import { AddClubComponent } from './add-club/add-club.component';
import { AddTournamentComponent } from './add-tournament/add-tournament.component';
import { TournamentComponent } from './tournament/tournament.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    ToolBarComponent,
    PlayerComponent,
    ClubsComponent,
    ClubComponent,
    LoginComponent,
    SignUpComponent,
    DialogDelete,
    AddPlayerComponent,
    AddClubComponent,
    AddTournamentComponent,
    TournamentComponent,
    TournamentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSortModule,
    MatExpansionModule,
    FormsModule,
    Ng5SliderModule,
    MatCheckboxModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },DatePipe],
  bootstrap: [AppComponent],
  entryComponents:[DialogDelete]
})
export class AppModule {
}
