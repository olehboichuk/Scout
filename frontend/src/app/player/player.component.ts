import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {FullPlayerModel} from "../models/fullPlayer.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PlayerModel} from "../models/player.model";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ContractModel} from "../models/contract.model";
import {PlayerWclubModel} from "../models/playerWclub.model";
import {FullStats} from "../models/fullStats";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})

export class PlayerComponent implements OnInit {
  displayedColumnsForward: string[] = ['Number_Of_Matches', 'Number_Yellow_Cards', 'Number_Red_Cards', 'Number_Play_Minutes', 'Passes_Accuracy', 'Goals', 'Assists', 'Key_Pass', 'Hit_Match', 'Goal_Match', 'Hit_Goal'];
  displayedColumnsHalfback: string[] = ['Number_Of_Matches', 'Number_Yellow_Cards', 'Number_Red_Cards', 'Number_Play_Minutes', 'Passes_Accuracy', 'Number_Interceptions_Match', 'Goals', 'Assists', 'Key_Pass'];
  displayedColumnsDefender: string[] = ['Number_Of_Matches', 'Number_Yellow_Cards', 'Number_Red_Cards', 'Number_Play_Minutes', 'Passes_Accuracy', 'Number_Selections_Match', 'Number_Interceptions_Match'];
  displayedColumnsGoalkeeper: string[] = ['Number_Of_Matches', 'Number_Yellow_Cards', 'Number_Red_Cards', 'Number_Play_Minutes', 'Passes_Accuracy', 'Saves_Match', 'Missed_Goal_Match', 'Percentage_Served_Penalty'];
  private ADMIN = false;
  private MEMBER = false;
  private changeForm: FormGroup;
  private filtersForm: FormGroup;
  public playerId: string;
  public loading = true;
  public player: PlayerWclubModel;
  private edited = true;
  public panelOpenState = false;
  public clubs: ContractModel[];
  public selectedPosition = '';
  public selectedSeason = '';
  private positionSelected = false;
  private seasons: [{ Season: string }];
  dataSource: { stats: FullStats };

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private authService: AuthService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.seasons = [{Season: null}];
    this.edited = true;
    if (localStorage.getItem("role") == "ADMIN") {
      this.ADMIN = true;
      this.MEMBER = true;
    }
    if (localStorage.getItem("role") == "MEMBER")
      this.MEMBER = true;
    this.changeForm = this.formBuilder.group({
      First_Name: ['', Validators.required],
      Surname: ['', Validators.required],
      Patronymic: ['', Validators.required],
      Citizenship: ['', Validators.required],
      Birthday: ['', Validators.required],
      Cost: ['', Validators.required],
      Salary: ['', Validators.required],
      Game_Experience: ['', Validators.required],
      Height: ['', Validators.required],
      Weight: ['', Validators.required],
      Kicking_Leg: ['', Validators.required],
      Agent: ['', Validators.required],
      Position: ['', Validators.required]
    });
    this.filtersForm = this.formBuilder.group({
      Season: ['', Validators.required],
      Position: ['']
    });
    this.loading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.playerId = paramMap.get('id');
        this.authService.getPlayer(this.playerId).subscribe(res => {
          this.player = res[0];
          console.warn(this.player);
          this.changeForm.controls['Kicking_Leg'].setValue(this.player.Kicking_Leg);
          this.changeForm.controls['Birthday'].setValue(this.player.Birthday);

          if (this.player.Position != null && this.player.Position[5] != null) {
            // @ts-ignore
            this.selectedPosition = this.player.Position;
            this.onSelectPosition();
            this.changeForm.controls['Position'].setValue([this.player.Position]);
          } else {
            this.changeForm.controls['Position'].setValue(this.player.Position);
          }
          this.authService.getPlayerContracts(this.playerId).subscribe(res => {
            // @ts-ignore
            this.clubs = res;
            this.loading = false;
          }, error => {
            console.warn('no ok');
          });
        }, error => {
          console.warn('no ok');
        });
      }
    });
  }

  onEdit() {
    this.edited = false;
    this.changeForm.controls['First_Name'].setValue(this.player.First_Name);
    this.changeForm.controls['Surname'].setValue(this.player.Surname);
    this.changeForm.controls['Patronymic'].setValue(this.player.Patronymic);
    this.changeForm.controls['Citizenship'].setValue(this.player.Citizenship);
    this.changeForm.controls['Cost'].setValue(this.player.Cost);
    this.changeForm.controls['Salary'].setValue(this.player.Salary);
    this.changeForm.controls['Game_Experience'].setValue(this.player.Game_Experience);
    this.changeForm.controls['Height'].setValue(this.player.Height);
    this.changeForm.controls['Weight'].setValue(this.player.Weight);
    this.changeForm.controls['Kicking_Leg'].setValue(this.player.Kicking_Leg);
    this.changeForm.controls['Agent'].setValue(this.player.Agent);
  }

  onCancel() {
    this.edited = true;
  }

  onSubmit() {
    this.changePlayer();
  }

  private changePlayer() {
    const player = <PlayerModel>{
      Number_Licenses: this.player.Number_Licenses,
      First_Name: this.changeForm.get('First_Name').value,
      Surname: this.changeForm.get('Surname').value,
      Patronymic: this.changeForm.get('Patronymic').value,
      Citizenship: this.changeForm.get('Citizenship').value,
      Birthday: this.changeForm.get('Birthday').value,
      Cost: this.changeForm.get('Cost').value,
      Salary: this.changeForm.get('Salary').value,
      Game_Experience: this.changeForm.get('Game_Experience').value,
      Height: this.changeForm.get('Height').value,
      Weight: this.changeForm.get('Weight').value,
      Kicking_Leg: this.changeForm.get('Kicking_Leg').value,
      Agent: this.changeForm.get('Agent').value
    };
    this.loading = true;
    this.authService.updatePlayer(player).subscribe(res => {
      this.authService.updatePositions({position: this.changeForm.get('Position').value, id: this.player.Number_Licenses}).subscribe(res => {
        this.ngOnInit();
      }, error => {
        this.loading = false;
      });
    }, error => {
      this.loading = false;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogDelete, {
      width: '320px',
      height: '200px',
      data: {Number_Licenses: this.player.Number_Licenses}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onSubmitFilters() {

  }

  onSelectPosition() {
    this.selectedSeason = '';
    this.positionSelected = true;
    console.log(this.selectedPosition);
    this.authService.getSeasonsbyId(this.player.Number_Licenses, this.selectedPosition.toLocaleLowerCase()).subscribe(res => {
      this.seasons = res;
    });
  }

  onSelectSeason() {
    this.authService.getStatsById(this.player.Number_Licenses, {Season: this.selectedSeason}, this.selectedPosition.toLocaleLowerCase()).subscribe(res => {
      console.log(res);
      this.dataSource = res;
    });
  }
}

@Component({
  selector: 'dialog-delete',
  templateUrl: 'dialogDelete.html',
})
export class DialogDelete {
  public playerId: string;

  constructor(public dialogRef: MatDialogRef<DialogDelete>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private formBuilder: FormBuilder, private authService: AuthService, public route: ActivatedRoute, private router: Router) {
  }

  onNoClick(): void {
    this.authService.deletePlayer(this.data.Number_Licenses).subscribe(res => {
      this.router.navigate(['/players']);
    }, error => {
      console.warn('no ok');
    });
  }
}

export interface DialogData {
  Number_Licenses: string;
}
