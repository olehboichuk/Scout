import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClubModel} from "../models/club.model";
import {PlayerWclubModel} from "../models/playerWclub.model";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {TournamentModel} from "../models/tournament.model";
import {DialogDelete} from "../player/player.component";

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {
  private ADMIN = false;
  private MEMBER = false;
  private changeForm: FormGroup;
  public loading = true;
  public tournament: TournamentModel;
  private edited = true;
  private tournament_Name: string;
  private tournament_Season: string;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private authService: AuthService, public route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.edited = true;
    if (localStorage.getItem("role") == "ADMIN") {
      this.ADMIN = true;
      this.MEMBER = true;
    }
    if (localStorage.getItem("role") == "MEMBER")
      this.MEMBER = true;
    this.changeForm = this.formBuilder.group({
      Name_Tournament: ['', Validators.required],
      Season: ['', Validators.required],
      Number_Of_Teams: ['', Validators.required],
      Area: ['', Validators.required],
      Winner: [''],
      Team_Up_League: [''],
      Team_Down_League: [''],
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('name') && paramMap.has('season')) {
        this.tournament_Name = paramMap.get('name');
        this.tournament_Season = paramMap.get('season');
      }
      this.authService.getTournament(this.tournament_Name, this.tournament_Season).subscribe(res => {
        this.tournament = res[0];
        this.loading = false;
      })
    });
  }

  onEdit() {
    this.edited = false;
    this.changeForm.controls['Name_Tournament'].setValue(this.tournament.Name_Tournament);
    this.changeForm.controls['Season'].setValue(this.tournament.Season);
    this.changeForm.controls['Number_Of_Teams'].setValue(this.tournament.Number_Of_Teams);
    this.changeForm.controls['Area'].setValue(this.tournament.Area);
    if (this.tournament.Winner) {
      this.changeForm.controls['Winner'].setValue(this.tournament.Winner);
      this.changeForm.controls['Team_Up_League'].setValue(this.tournament.Team_Up_League);
      this.changeForm.controls['Team_Down_League'].setValue(this.tournament.Team_Down_League);
    }
  }

  onCancel() {
    this.onEdit();
    this.edited = true;
  }

  onSubmit() {
    this.changeTournament();
  }

  private changeTournament() {
    const tournament = <TournamentModel>{
      Name_Tournament: this.changeForm.get('Name_Tournament').value,
      Season: this.changeForm.get('Season').value,
      Number_Of_Teams: this.changeForm.get('Number_Of_Teams').value,
      Area: this.changeForm.get('Area').value,
      Winner: this.changeForm.get('Winner').value,
      Team_Up_League: this.changeForm.get('Team_Up_League').value,
      Team_Down_League: this.changeForm.get('Team_Down_League').value,
    };
    this.loading = true;
    this.authService.updateTournament(tournament, this.tournament.Name_Tournament, this.tournament.Season).subscribe(res => {
      if (this.tournament.Name_Tournament != this.changeForm.get('Name_Tournament').value || this.tournament.Season != this.changeForm.get('Season').value) {
        this.edited = true;
        this.loading = false;
        this.router.navigate(['/tournament/', this.changeForm.get('Name_Tournament').value, this.changeForm.get('Season').value]);
      } else {
        this.ngOnInit();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogDelete, {
      width: '320px',
      height: '200px',
      data: {Name_Tournament: this.tournament.Name_Tournament, Season: this.tournament.Season}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
