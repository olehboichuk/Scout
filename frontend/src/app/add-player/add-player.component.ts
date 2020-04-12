import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PlayerModel} from "../models/player.model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {
  private addForm: FormGroup;
  public loading = false;
  public error = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, public route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      Number_Licenses: ['', Validators.required],
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
  }

  onSubmit() {
    const player = <PlayerModel>{
      Number_Licenses: this.addForm.get('Number_Licenses').value,
      First_Name: this.addForm.get('First_Name').value,
      Surname: this.addForm.get('Surname').value,
      Patronymic: this.addForm.get('Patronymic').value,
      Citizenship: this.addForm.get('Citizenship').value,
      Birthday: this.addForm.get('Birthday').value,
      Cost: this.addForm.get('Cost').value,
      Salary: this.addForm.get('Salary').value,
      Game_Experience: this.addForm.get('Game_Experience').value,
      Height: this.addForm.get('Height').value,
      Weight: this.addForm.get('Weight').value,
      Kicking_Leg: this.addForm.get('Kicking_Leg').value,
      Agent_Name: this.addForm.get('Agent_Name').value,
      Agent_Phone: this.addForm.get('Agent_Phone').value,
    };
    this.loading = true;
    this.authService.addPlayer(player).subscribe(res => {
      this.authService.updatePositions({
        position: this.addForm.get('Position').value,
        id: this.addForm.get('Number_Licenses').value
      }).subscribe(res => {
        this.router.navigate(['/player/', this.addForm.get('Number_Licenses').value]);
      }, error => {
        this.error = error.message;
        this.loading = false;
      });
    }, error => {
      console.log(error);
      this.error = error.error.message;
      this.loading = false;
    });
  }

}
