import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClubModel} from "../models/club.model";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {TournamentModel} from "../models/tournament.model";

@Component({
  selector: 'app-add-tournament',
  templateUrl: './add-tournament.component.html',
  styleUrls: ['./add-tournament.component.scss']
})
export class AddTournamentComponent implements OnInit {
  private changeForm: FormGroup;
  public loading = false;
  public tournament: TournamentModel;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.changeForm = this.formBuilder.group({
      Name_Tournament: ['', Validators.required],
      Season: ['', Validators.required],
      Number_Of_Teams: ['', Validators.required],
      Area: ['', Validators.required]
    });
  }


  onSubmit() {
    const tournament = <TournamentModel>{
      Name_Tournament: this.changeForm.get('Name_Tournament').value,
      Season: this.changeForm.get('Season').value,
      Number_Of_Teams: this.changeForm.get('Number_Of_Teams').value,
      Area: this.changeForm.get('Area').value
    };
    this.loading = true;
    this.authService.addTournament(tournament).subscribe(res=>{
      this.router.navigate(['/tournament/', this.changeForm.get('Name_Tournament').value,this.changeForm.get('Season').value]);
    },error => {
      console.error(error);
      this.loading = false;
    });
  }
}
