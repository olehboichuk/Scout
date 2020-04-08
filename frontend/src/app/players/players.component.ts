import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {PlayerModel} from "../models/player.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {PlayerWclubModel} from "../models/playerWclub.model";

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})

export class PlayersComponent implements OnInit {
  private displayedColumns: string[] = ['First_Name', 'Name_Club', 'Surname', 'Age', 'Game_Experience', 'Kicking_Leg', 'Cost'];
  private dataSource:any;
  private loading = false;
  private users: PlayerModel[] = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUsers().subscribe(usersData => {
      // @ts-ignore
      this.users = usersData;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
    });
  }

}
