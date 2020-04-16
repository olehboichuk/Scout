import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClubModel} from "../models/club.model";
import {PlayerWclubModel} from "../models/playerWclub.model";
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {DialogDelete} from "../player/player.component";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss']
})
export class ClubComponent implements OnInit {
  private ADMIN = false;
  private MEMBER = false;
  private changeForm: FormGroup;
  public loading = true;
  public club: ClubModel;
  private edited = true;
  public players: any;
  private clubName: string;
  private stats: any;
  private clubCountTournament: any;
  private dataSource: any;
  private prvPhone: any;
  private displayedColumns: string[] = ['Name', 'Citizenship', 'Cost', 'Salary', 'Position'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

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
      Name_Club: ['', Validators.required],
      City: ['', Validators.required],
      Street: ['', Validators.required],
      Build: ['', Validators.required],
      // Phone: ['']
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('name')) {
        this.clubName = paramMap.get('name');
      }
      this.authService.getClub(this.clubName).subscribe(res => {
        this.club = res[0];
        this.authService.getClubPlayers(this.clubName).subscribe(res => {
          this.players = res;
          this.dataSource = new MatTableDataSource(this.players);
          this.dataSource.paginator = this.paginator;
          this.authService.getClubStats(this.clubName).subscribe(res => {
            this.stats = res[0];
            console.log(this.stats);
            this.authService.getClubCountTournament(this.clubName).subscribe(res => {
              this.clubCountTournament = res[0];
              console.log(this.clubCountTournament);
              this.loading = false;
            });
          });
        });
      })
    });
  }

  onEdit() {
    this.edited = false;
    this.changeForm.controls['Name_Club'].setValue(this.club.Name_Club);
    this.changeForm.controls['City'].setValue(this.club.City);
    this.changeForm.controls['Street'].setValue(this.club.Street);
    this.changeForm.controls['Build'].setValue(this.club.Build);
    // if (this.club.Telephone != null && this.club.Telephone.length > 5){
    //
    //   this.changeForm.controls['Phone'].setValue(this.club.Telephone);
    //   this.prvPhone = this.club.Telephone;
    // }
  }

  onCancel() {
    this.onEdit();
    this.edited = true;
  }

  onSubmit() {
    this.changeClub();
  }

  changeClub() {
    const club = <ClubModel>{
      Name_Club: this.changeForm.get('Name_Club').value,
      City: this.changeForm.get('City').value,
      Street: this.changeForm.get('Street').value,
      Build: this.changeForm.get('Build').value,
    };
    this.loading = true;
    // console.log(this.changeForm.get('Phone').value);
    this.authService.updateClub(club, this.club.Name_Club).subscribe(res => {
      // this.authService.updatePhone({phone: this.changeForm.get('Phone').value, prv: this.prvPhone}, this.club.Name_Club).subscribe(res => {
        if (this.club.Name_Club != this.changeForm.get('Name_Club').value) {
          this.edited = true;
          this.loading = false;
          this.router.navigate(['/club/', this.changeForm.get('Name_Club').value]);
        } else {
          this.ngOnInit();
        }
      // });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogDelete, {
      width: '320px',
      height: '200px',
      data: {Name_Club: this.club.Name_Club}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
