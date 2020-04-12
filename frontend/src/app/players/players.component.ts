import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {PlayerModel} from "../models/player.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LabelType, Options} from 'ng5-slider';
import {PlayerWclubModel} from "../models/playerWclub.model";

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})

export class PlayersComponent implements OnInit {
  private displayedColumns: string[] = ['First_Name', 'Name_Club', 'Surname', 'Age', 'Game_Experience', 'Kicking_Leg', 'Cost'];
  private dataSource: any;
  private loading = false;
  private users: PlayerWclubModel[] = [];
  private ADMIN = false;
  private MEMBER = false;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private filterForm: FormGroup;
  private filterDataIn: any;
  minValue: number = 0;
  minValueAge: number;
  maxValueAge: number;
  maxValue: number;
  options: Options;
  optionsAge: Options;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.loading = true;
    this.authService.getFilterData().subscribe(res => {
      this.filterDataIn = res;
      this.minValueAge = this.filterDataIn[0].Age_Min;
      this.maxValueAge = this.filterDataIn[0].Age_Max;
      this.maxValue = this.filterDataIn[0].Coast_Max;
      this.optionsAge = {
        floor: this.minValueAge,
        ceil: this.maxValueAge,
        translate: (value: number, label: LabelType): string => {
          switch (label) {
            case LabelType.Low:
              return '<b>Вік від:</b> ' + value + 'р.';
            case LabelType.High:
              return '<b>До:</b> ' + value + 'р.';
            default:
              return '' + value + 'р.';
          }
        }
      };
      this.options = {
        floor: 0,
        ceil: this.filterDataIn[0].Coast_Max,
        translate: (value: number, label: LabelType): string => {
          switch (label) {
            case LabelType.Low:
              return '<b>Мін ціна:</b> $' + value;
            case LabelType.High:
              return '<b>Макс ціна:</b> $' + value;
            default:
              return '$' + value;
          }
        }
      };
      this.loading = false;
    });
    if (localStorage.getItem("role") == "ADMIN") {
      this.ADMIN = true;
      this.MEMBER = true;
    }
    if (localStorage.getItem("role") == "MEMBER")
      this.MEMBER = true;
    this.authService.getUsers().subscribe(usersData => {
      // @ts-ignore
      this.users = usersData;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;

    });
    this.filterForm = this.formBuilder.group({
      Positions: [''],
      Kicking_Leg: [''],
      IsChecked:['']
    });
  }

  onFilter() {
    const filtersData = {
      Min_Coast: this.minValue,
      Min_Age: this.minValueAge,
      Max_Coast: this.maxValue,
      Max_Age: this.maxValueAge,
      Positions: this.filterForm.get('Positions').value==''? null :this.filterForm.get('Positions').value,
      Kicking_Leg: this.filterForm.get('Kicking_Leg').value==''? null :this.filterForm.get('Kicking_Leg').value,
      All_Club: this.filterForm.get('IsChecked').value==''? null : 1,
    };
    this.authService.doFilter(filtersData).subscribe(res => {
      // @ts-ignore
      this.users = res;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.changeDetectorRefs.detectChanges();
    });
  }
}
