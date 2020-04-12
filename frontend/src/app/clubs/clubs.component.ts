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
  private displayedColumns: string[] = ['Name_Club', 'City', 'Street', 'Build'];
  private dataSource: any;
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
      // @ts-ignore
      this.clubs = clubsData;
      this.dataSource = new MatTableDataSource(this.clubs);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }

}
