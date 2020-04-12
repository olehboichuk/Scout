import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PlayerModel} from "../models/player.model";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ContractModel} from "../models/contract.model";
import {PlayerWclubModel} from "../models/playerWclub.model";
import {FullStats} from "../models/fullStats";
import {DatePipe} from "@angular/common";
import {DefenderModel} from "../models/defender.model";
import {ForwardModel} from "../models/forward.model";
import {GoalkeeperModel} from "../models/goalkeeper.model";
import {HalfbackModel} from "../models/halfback.model";

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
  private addContractForm: FormGroup;
  private editContractForm: FormGroup;
  private addStatsDefender: FormGroup;
  private addStatsForward: FormGroup;
  private addStatsGoalkeeper: FormGroup;
  private addStatsHalfback: FormGroup;
  public playerId: string;
  public loading = true;
  public player: PlayerWclubModel;
  private edited = true;
  private addContract = true;
  private addStats = true;
  public panelOpenState = false;
  public clubs: ContractModel[];
  public selectedPosition = '';
  public selectedSeason = '';
  private positionSelected = false;
  private clubNames: any;
  private seasons: [{ Season: string }];
  private dataSource: { stats: FullStats };
  private contractError = '';
  private numEdited: number;
  private addStatsPorition: string;
  private seazonError = '';
  private editStats = false;


  constructor(public datepipe: DatePipe, public dialog: MatDialog, private formBuilder: FormBuilder, private authService: AuthService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loading = true;
    this.selectedSeason = '';
    this.selectedPosition = '';
    this.positionSelected = false;
    this.editStats = false;
    this.addStatsPorition = '';
    this.numEdited = null;
    this.contractError = '';
    this.seazonError = '';
    this.seasons = [{Season: null}];
    this.edited = true;
    this.addContract = true;
    this.addStats = true;
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
      Agent_Name: ['', Validators.required],
      Agent_Phone: ['', Validators.required],
      Position: ['', Validators.required]
    });
    this.filtersForm = this.formBuilder.group({
      Season: ['', Validators.required],
      Position: ['']
    });
    this.addContractForm = this.formBuilder.group({
      Contract_Club: ['', Validators.required],
      Contract_Start: ['', Validators.required],
      Contract_End: ['', Validators.required],
    });
    this.editContractForm = this.formBuilder.group({
      Contract_C: ['', Validators.required],
      Contract_S: ['', Validators.required],
      Contract_E: ['', Validators.required],
    });
    this.addStatsDefender = this.formBuilder.group({
      DSeason: ['', Validators.required],
      DNumber_Of_Matches: ['', Validators.required],
      DNumber_Yellow_Cards: ['', Validators.required],
      DNumber_Red_Cards: ['', Validators.required],
      DNumber_Play_Minutes: ['', Validators.required],
      DPasses_Accuracy: ['', Validators.required],
      DNumber_Selections_Match: ['', Validators.required],
      DNumber_Interceptions_Match: ['', Validators.required],
    });
    this.addStatsForward = this.formBuilder.group({
      FSeason: ['', Validators.required],
      FNumber_Of_Matches: ['', Validators.required],
      FNumber_Yellow_Cards: ['', Validators.required],
      FNumber_Red_Cards: ['', Validators.required],
      FNumber_Play_Minutes: ['', Validators.required],
      FPasses_Accuracy: ['', Validators.required],
      FGoals: ['', Validators.required],
      FAssists: ['', Validators.required],
      FKey_Pass: ['', Validators.required],
      FHit_Match: ['', Validators.required],
    });
    this.addStatsGoalkeeper = this.formBuilder.group({
      GSeason: ['', Validators.required],
      GNumber_Of_Matches: ['', Validators.required],
      GNumber_Yellow_Cards: ['', Validators.required],
      GNumber_Red_Cards: ['', Validators.required],
      GNumber_Play_Minutes: ['', Validators.required],
      GPasses_Accuracy: ['', Validators.required],
      GSaves_Match: ['', Validators.required],
      GMissed_Goal_Match: ['', Validators.required],
      GPercentage_Served_Penalty: ['', Validators.required],
    });
    this.addStatsHalfback = this.formBuilder.group({
      HSeason: ['', Validators.required],
      HNumber_Of_Matches: ['', Validators.required],
      HNumber_Yellow_Cards: ['', Validators.required],
      HNumber_Red_Cards: ['', Validators.required],
      HNumber_Play_Minutes: ['', Validators.required],
      HPasses_Accuracy: ['', Validators.required],
      HNumber_Interceptions_Match: ['', Validators.required],
      HGoals: ['', Validators.required],
      HAssists: ['', Validators.required],
      HKey_Pass: ['', Validators.required],
    });
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
    this.authService.getAllClubsNames().subscribe(res => {
      this.clubNames = res;
    }, error => {
      console.error(error);
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
    this.changeForm.controls['Agent_Name'].setValue(this.player.Agent_Name);
    this.changeForm.controls['Agent_Phone'].setValue(this.player.Agent_Phone);
  }

  onCancel() {
    this.onEdit();
    this.edited = true;
  }

  onSubmit() {
    this.changePlayer();
  }

  onSubmitAdd() {
    let allGood = true;
    const contract = {
      Number_Licenses: this.player.Number_Licenses,
      Name_Club: this.addContractForm.get('Contract_Club').value,
      Contract_Start: this.datepipe.transform(this.addContractForm.get('Contract_Start').value, 'yyyy-MM-dd'),
      Contract_End: this.datepipe.transform(this.addContractForm.get('Contract_End').value, 'yyyy-MM-dd'),
    };
    this.clubs.forEach(contr => {
      let start = new Date(contr.Contract_Start);
      let end = new Date(contr.Contract_End);
      if ((this.addContractForm.get('Contract_Start').value > start && this.addContractForm.get('Contract_End').value < end) || (this.addContractForm.get('Contract_End').value > start && this.addContractForm.get('Contract_End').value < end) || (this.addContractForm.get('Contract_Start').value < end && this.addContractForm.get('Contract_Start').value > start)) {
        this.contractError = 'Контракт на ці дати вже існує!!!';
        allGood = false;
      }
    });
    if (this.addContractForm.get('Contract_Start').value >= this.addContractForm.get('Contract_End').value) {
      this.contractError = 'Дата початку не можу бути більшою за дату закінчення!!!';
      allGood = false;
    }
    if (allGood) {
      this.authService.addContract(contract).subscribe(res => {
        console.log('success added');
        this.ngOnInit();
      }, error => {
        console.error(error);
      })
    }

  }

  onChangeDate() {
    this.contractError = '';
  }

  onCancelAdd() {
    this.addContract = true;
    this.addContractForm.controls['Contract_Club'].setValue('');
    this.addContractForm.controls['Contract_Start'].setValue('');
    this.addContractForm.controls['Contract_End'].setValue('');
  }

  onEditContract(i: number) {
    this.numEdited = i;
    this.editContractForm.controls['Contract_C'].setValue(this.clubs[i].Name_Club);
    this.editContractForm.controls['Contract_S'].setValue(this.clubs[i].Contract_Start);
    this.editContractForm.controls['Contract_E'].setValue(this.clubs[i].Contract_End);
  }

  onCancelEditContract() {
    this.numEdited = null;
  }

  onAddContract() {
    this.addContract = false;
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
      Agent_Name: this.changeForm.get('Agent_Name').value,
      Agent_Phone: this.changeForm.get('Agent_Phone').value
    };
    this.loading = true;
    this.authService.updatePlayer(player).subscribe(res => {
      this.authService.updatePositions({
        position: this.changeForm.get('Position').value,
        id: this.player.Number_Licenses
      }).subscribe(res => {
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

  onDeleteContract(i: number) {
    let start = new Date(this.clubs[i].Contract_Start);
    let st_d = this.datepipe.transform(start, 'yyyy-MM-dd');
    const contract = {
      Number_Licenses: this.player.Number_Licenses,
      Name_Club: this.clubs[i].Name_Club,
      Contract_Start: st_d
    };
    this.authService.deleteContract(contract).subscribe(res => {
      this.ngOnInit();
    }, error => {

    })
  }

  onUpdateContract(i: number) {
    let start = new Date(this.editContractForm.get('Contract_S').value);
    let end = new Date(this.editContractForm.get('Contract_E').value);
    let prv_start = new Date(this.clubs[i].Contract_Start);

    let st_d = this.datepipe.transform(start, 'yyyy-MM-dd');
    let ed_d = this.datepipe.transform(end, 'yyyy-MM-dd');
    let prv_s = this.datepipe.transform(prv_start, 'yyyy-MM-dd');
    const contract = {
      Number_Licenses: this.player.Number_Licenses,
      Name_Club: this.editContractForm.get('Contract_C').value,
      Contract_Start: st_d,
      Contract_End: ed_d,
      Previous_Name_Club: this.clubs[i].Name_Club,
      Previous_Contract_Start: prv_s
    };
    this.authService.updateContract(contract).subscribe(res => {
      this.ngOnInit();
    }, error => {

    })
  }

  onAddStats() {
    this.addStats = false;
  }

  cancelAddStats() {
    this.addStats = true;
  }

  onAddStatsDefender() {
    let allGood = true;
    let selectedPosition = 'Defender';
    if (!this.editStats) {
      this.authService.getSeasonsbyId(this.player.Number_Licenses, selectedPosition.toLocaleLowerCase()).subscribe(res => {
        this.seasons = res;
      });
      this.seasons.forEach(sez => {
        if (sez == this.addStatsDefender.get('DSeason').value) {
          this.seazonError = 'Статистика за даний сезон присутня';
          allGood = false;
        }
      });
    }
    if (allGood) {
      const defender = <DefenderModel>{
        Season: this.addStatsDefender.get('DSeason').value,
        Number_Licenses: this.player.Number_Licenses,
        Number_Of_Matches: this.addStatsDefender.get('DNumber_Of_Matches').value,
        Number_Yellow_Cards: this.addStatsDefender.get('DNumber_Yellow_Cards').value,
        Number_Red_Cards: this.addStatsDefender.get('DNumber_Red_Cards').value,
        Number_Play_Minutes: this.addStatsDefender.get('DNumber_Play_Minutes').value,
        Passes_Accuracy: this.addStatsDefender.get('DPasses_Accuracy').value,
        Number_Selections_Match: this.addStatsDefender.get('DNumber_Selections_Match').value,
        Number_Interceptions_Match: this.addStatsDefender.get('DNumber_Interceptions_Match').value,
      };
      if (!this.editStats) {
        this.authService.addDefender(defender).subscribe(res => {
          console.log('success added');
          this.ngOnInit();
        }, error => {

        });
      } else {
        this.authService.updateDefender(defender).subscribe(res => {
          console.log('success upd');
          this.ngOnInit();
        }, error => {

        });
      }
    }
  }

  onAddStatsForward() {
    let allGood = true;
    let selectedPosition = 'Forward';
    if (!this.editStats) {
      this.authService.getSeasonsbyId(this.player.Number_Licenses, selectedPosition.toLocaleLowerCase()).subscribe(res => {
        this.seasons = res;
      });
      this.seasons.forEach(sez => {
        if (sez == this.addStatsForward.get('FSeason').value) {
          this.seazonError = 'Статистика за даний сезон присутня';
          allGood = false;
        }
      });
    }
    if (allGood) {
      const forward = <ForwardModel>{
        Season: this.addStatsForward.get('FSeason').value,
        Number_Licenses: this.player.Number_Licenses,
        Number_Of_Matches: this.addStatsForward.get('FNumber_Of_Matches').value,
        Number_Yellow_Cards: this.addStatsForward.get('FNumber_Yellow_Cards').value,
        Number_Red_Cards: this.addStatsForward.get('FNumber_Red_Cards').value,
        Number_Play_Minutes: this.addStatsForward.get('FNumber_Play_Minutes').value,
        Passes_Accuracy: this.addStatsForward.get('FPasses_Accuracy').value,
        Goals: this.addStatsForward.get('FGoals').value,
        Assists: this.addStatsForward.get('FAssists').value,
        Key_Pass: this.addStatsForward.get('FKey_Pass').value,
        Hit_Match: this.addStatsForward.get('FHit_Match').value,
      };
      if (!this.editStats) {
        this.authService.addForward(forward).subscribe(res => {
          console.log('success added');
          this.ngOnInit();
        }, error => {

        });
      } else {
        this.authService.updateForward(forward).subscribe(res => {
          console.log('success upd');
          this.ngOnInit();
        }, error => {

        });
      }

    }
  }

  onAddStatsGoalkeeper() {
    let allGood = true;
    let selectedPosition = 'Goalkeeper';
    if (!this.editStats) {
      this.authService.getSeasonsbyId(this.player.Number_Licenses, selectedPosition.toLocaleLowerCase()).subscribe(res => {
        this.seasons = res;
      });
      this.seasons.forEach(sez => {
        if (sez == this.addStatsGoalkeeper.get('GSeason').value) {
          this.seazonError = 'Статистика за даний сезон присутня';
          allGood = false;
        }
      });
    }
    if (allGood) {
      const goalkeeper = <GoalkeeperModel>{
        Season: this.addStatsGoalkeeper.get('GSeason').value,
        Number_Licenses: this.player.Number_Licenses,
        Number_Of_Matches: this.addStatsGoalkeeper.get('GNumber_Of_Matches').value,
        Number_Yellow_Cards: this.addStatsGoalkeeper.get('GNumber_Yellow_Cards').value,
        Number_Red_Cards: this.addStatsGoalkeeper.get('GNumber_Red_Cards').value,
        Number_Play_Minutes: this.addStatsGoalkeeper.get('GNumber_Play_Minutes').value,
        Passes_Accuracy: this.addStatsGoalkeeper.get('GPasses_Accuracy').value,
        Saves_Match: this.addStatsGoalkeeper.get('GSaves_Match').value,
        Missed_Goal_Match: this.addStatsGoalkeeper.get('GMissed_Goal_Match').value,
        Percentage_Served_Penalty: this.addStatsGoalkeeper.get('GPercentage_Served_Penalty').value,
      };
      if (!this.editStats) {
        this.authService.addGoalkeeper(goalkeeper).subscribe(res => {
          console.log('success added');
          this.ngOnInit();
        }, error => {

        });
      } else {
        this.authService.updateGoalkeeper(goalkeeper).subscribe(res => {
          console.log('success upd');
          this.ngOnInit();
        }, error => {

        });
      }
    }
  }

  onAddStatsHalfback() {
    let allGood = true;
    let selectedPosition = 'Halfback';
    if (!this.editStats) {
      this.authService.getSeasonsbyId(this.player.Number_Licenses, selectedPosition.toLocaleLowerCase()).subscribe(res => {
        this.seasons = res;
      });
      this.seasons.forEach(sez => {
        if (sez == this.addStatsHalfback.get('HSeason').value) {
          this.seazonError = 'Статистика за даний сезон присутня';
          allGood = false;
        }
      });
    }
    if (allGood) {
      const halfback = <HalfbackModel>{
        Season: this.addStatsHalfback.get('HSeason').value,
        Number_Licenses: this.player.Number_Licenses,
        Number_Of_Matches: this.addStatsHalfback.get('HNumber_Of_Matches').value,
        Number_Yellow_Cards: this.addStatsHalfback.get('HNumber_Yellow_Cards').value,
        Number_Red_Cards: this.addStatsHalfback.get('HNumber_Red_Cards').value,
        Number_Play_Minutes: this.addStatsHalfback.get('HNumber_Play_Minutes').value,
        Passes_Accuracy: this.addStatsHalfback.get('HPasses_Accuracy').value,
        Number_Interceptions_Match: this.addStatsHalfback.get('HNumber_Interceptions_Match').value,
        Goals: this.addStatsHalfback.get('HGoals').value,
        Assists: this.addStatsHalfback.get('HAssists').value,
        Key_Pass: this.addStatsHalfback.get('HKey_Pass').value,
      };
      if (!this.editStats) {
        this.authService.addHalfback(halfback).subscribe(res => {
          console.log('success added');
          this.ngOnInit();
        }, error => {

        });
      } else {
        this.authService.updateHalfback(halfback).subscribe(res => {
          console.log('success upd');
          this.ngOnInit();
        }, error => {

        });
      }
    }
  }

  onEditStats() {
    this.addStats = false;
    this.editStats = true;
    if (this.selectedPosition == 'Forward') {
      this.addStatsPorition = 'Forward';
      this.addStatsForward.controls['FSeason'].setValue(this.dataSource[0].Season);
      this.addStatsForward.controls['FNumber_Of_Matches'].setValue(this.dataSource[0].Number_Of_Matches);
      this.addStatsForward.controls['FNumber_Yellow_Cards'].setValue(this.dataSource[0].Number_Yellow_Cards);
      this.addStatsForward.controls['FNumber_Red_Cards'].setValue(this.dataSource[0].Number_Red_Cards);
      this.addStatsForward.controls['FNumber_Play_Minutes'].setValue(this.dataSource[0].Number_Play_Minutes);
      this.addStatsForward.controls['FPasses_Accuracy'].setValue(this.dataSource[0].Passes_Accuracy);
      this.addStatsForward.controls['FGoals'].setValue(this.dataSource[0].Goals);
      this.addStatsForward.controls['FAssists'].setValue(this.dataSource[0].Assists);
      this.addStatsForward.controls['FKey_Pass'].setValue(this.dataSource[0].Key_Pass);
      this.addStatsForward.controls['FHit_Match'].setValue(this.dataSource[0].Hit_Match);
    }
    if (this.selectedPosition == 'Halfback') {
      this.addStatsPorition = 'Halfback';
      this.addStatsHalfback.controls['HSeason'].setValue(this.dataSource[0].Season);
      this.addStatsHalfback.controls['HNumber_Of_Matches'].setValue(this.dataSource[0].Number_Of_Matches);
      this.addStatsHalfback.controls['HNumber_Yellow_Cards'].setValue(this.dataSource[0].Number_Yellow_Cards);
      this.addStatsHalfback.controls['HNumber_Red_Cards'].setValue(this.dataSource[0].Number_Red_Cards);
      this.addStatsHalfback.controls['HNumber_Play_Minutes'].setValue(this.dataSource[0].Number_Play_Minutes);
      this.addStatsHalfback.controls['HPasses_Accuracy'].setValue(this.dataSource[0].Passes_Accuracy);
      this.addStatsHalfback.controls['HNumber_Interceptions_Match'].setValue(this.dataSource[0].Number_Interceptions_Match);
      this.addStatsHalfback.controls['HGoals'].setValue(this.dataSource[0].Goals);
      this.addStatsHalfback.controls['HAssists'].setValue(this.dataSource[0].Assists);
      this.addStatsHalfback.controls['HKey_Pass'].setValue(this.dataSource[0].Key_Pass);
    }
    if (this.selectedPosition == 'Defender') {
      this.addStatsPorition = 'Defender';
      console.log(this.dataSource);
      this.addStatsDefender.controls['DSeason'].setValue(this.dataSource[0].Season);
      this.addStatsDefender.controls['DNumber_Of_Matches'].setValue(this.dataSource[0].Number_Of_Matches);
      this.addStatsDefender.controls['DNumber_Yellow_Cards'].setValue(this.dataSource[0].Number_Yellow_Cards);
      this.addStatsDefender.controls['DNumber_Red_Cards'].setValue(this.dataSource[0].Number_Red_Cards);
      this.addStatsDefender.controls['DNumber_Play_Minutes'].setValue(this.dataSource[0].Number_Play_Minutes);
      this.addStatsDefender.controls['DPasses_Accuracy'].setValue(this.dataSource[0].Passes_Accuracy);
      this.addStatsDefender.controls['DNumber_Selections_Match'].setValue(this.dataSource[0].Number_Selections_Match);
      this.addStatsDefender.controls['DNumber_Interceptions_Match'].setValue(this.dataSource[0].Number_Interceptions_Match);
    }
    if (this.selectedPosition == 'Goalkeeper') {
      this.addStatsPorition = 'Goalkeeper';
      this.addStatsGoalkeeper.controls['GSeason'].setValue(this.dataSource[0].Season);
      this.addStatsGoalkeeper.controls['GNumber_Of_Matches'].setValue(this.dataSource[0].Number_Of_Matches);
      this.addStatsGoalkeeper.controls['GNumber_Yellow_Cards'].setValue(this.dataSource[0].Number_Yellow_Cards);
      this.addStatsGoalkeeper.controls['GNumber_Red_Cards'].setValue(this.dataSource[0].Number_Red_Cards);
      this.addStatsGoalkeeper.controls['GNumber_Play_Minutes'].setValue(this.dataSource[0].Number_Play_Minutes);
      this.addStatsGoalkeeper.controls['GPasses_Accuracy'].setValue(this.dataSource[0].Passes_Accuracy);
      this.addStatsGoalkeeper.controls['GSaves_Match'].setValue(this.dataSource[0].Saves_Match);
      this.addStatsGoalkeeper.controls['GMissed_Goal_Match'].setValue(this.dataSource[0].Missed_Goal_Match);
      this.addStatsGoalkeeper.controls['GPercentage_Served_Penalty'].setValue(this.dataSource[0].Percentage_Served_Penalty);
    }
  }

  onDeleteStats() {
    const stat = {
      Number_Licenses: this.player.Number_Licenses,
      Season: this.selectedSeason
    };
    if (this.selectedPosition == 'Forward')
      this.authService.deleteStatsForward(stat).subscribe(res => {
        this.ngOnInit();
      }, error => {

      });
    if (this.selectedPosition == 'Halfback')
      this.authService.deleteStatsHalfback(stat).subscribe(res => {
        this.ngOnInit();
      }, error => {

      });
    if (this.selectedPosition == 'Defender')
      this.authService.deleteStatsDefender(stat).subscribe(res => {
        this.ngOnInit();
      }, error => {

      });
    if (this.selectedPosition == 'Goalkeeper')
      this.authService.deleteStatsGoalkeeper(stat).subscribe(res => {
        this.ngOnInit();
      }, error => {

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
    if (this.data.Name_Club){
      this.authService.deleteClub(this.data.Name_Club).subscribe(res => {
        this.router.navigate(['/clubs']);
      }, error => {
        console.warn('no ok');
      });
    }
    if (this.data.Number_Licenses){
      this.authService.deletePlayer(this.data.Number_Licenses).subscribe(res => {
        this.router.navigate(['/players']);
      }, error => {
        console.warn('no ok');
      });
    }
    if (this.data.Name_Tournament){
      this.authService.deleteTournament(this.data.Name_Tournament, this.data.Season).subscribe(res => {
        this.router.navigate(['/tournaments']);
      }, error => {
        console.warn('no ok');
      });
    }

  }
}

export interface DialogData {
  Number_Licenses: string;
  Name_Club: string;
  Season: string;
  Name_Tournament: string;
}
