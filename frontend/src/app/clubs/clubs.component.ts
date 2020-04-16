import {Component, OnInit, ViewChild} from '@angular/core';
import {PlayerWclubModel} from "../models/playerWclub.model";
import {ClubModel} from "../models/club.model";
import {MatPaginator} from "@angular/material/paginator";
import {AuthService} from "../services/auth.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.scss']
})
export class ClubsComponent implements OnInit {
  private displayedColumns: string[] = ['Name_Club', 'City', 'Street', 'Build', 'Goals', 'Tournaments'];
  private dataSource: any;
  private clubTournaments: any;
  private clubGoals: any;
  private loading = false;
  private clubs: ClubModel[] = [];
  private ADMIN = false;
  private MEMBER = false;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.loading = true;
    if (localStorage.getItem("role") == "ADMIN") {
      this.ADMIN = true;
      this.MEMBER = true;
    }
    if (localStorage.getItem("role") == "MEMBER")
      this.MEMBER = true;
    this.authService.getClubs().subscribe(clubsData => {
      this.authService.getdClubCountTournamentURL().subscribe(result => {
        this.authService.getClubStat().subscribe(res => {
          this.clubTournaments = result;
          this.clubGoals = res;
          // @ts-ignore
          this.clubs = clubsData;
          this.dataSource = new MatTableDataSource(this.clubs);
          this.dataSource.paginator = this.paginator;
          this.loading = false;
        });
      });
    });
  }

  clubss(Name_Club: any) {
    let res = '0';
    this.clubTournaments.forEach(e=>{
      if(e.Name_Club==Name_Club){
        res = e.Tournaments;
      }
    });
    return res;
  }
  goalss(Name_Club: any) {
    let res = '0';
    this.clubGoals.forEach(e=>{
      if(e.Name_Club==Name_Club){
        res = e.Goals;
      }
    });
    return res;
  }
}
