import {Component, OnInit, ViewChild} from '@angular/core';
import {ClubModel} from "../models/club.model";
import {MatPaginator} from "@angular/material/paginator";
import {TournamentModel} from "../models/tournament.model";
import {AuthService} from "../services/auth.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit {
  private displayedColumns: string[] = ['Name_Tournament', 'Season', 'Number_Of_Teams', 'Area'];
  private dataSource: any;
  private loading = false;
  private tournaments: TournamentModel[] = [];
  private ADMIN = false;
  private MEMBER = false;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loading = true;
    if (localStorage.getItem("role") == "ADMIN") {
      this.ADMIN = true;
      this.MEMBER = true;
    }
    if (localStorage.getItem("role") == "MEMBER")
      this.MEMBER = true;
    this.authService.getTournaments().subscribe(tournamentsData => {
      // @ts-ignore
      this.tournaments = tournamentsData;
      this.dataSource = new MatTableDataSource(this.tournaments);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }

}
