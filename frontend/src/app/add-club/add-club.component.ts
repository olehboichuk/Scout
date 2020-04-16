import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClubModel} from "../models/club.model";
import {PlayerWclubModel} from "../models/playerWclub.model";
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-club',
  templateUrl: './add-club.component.html',
  styleUrls: ['./add-club.component.scss']
})
export class AddClubComponent implements OnInit {
  private changeForm: FormGroup;
  public loading = false;
  public club: ClubModel;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.changeForm = this.formBuilder.group({
      Name_Club: ['', Validators.required],
      City: ['', Validators.required],
      Street: ['', Validators.required],
      Build: ['', Validators.required]
    });
  }


  onSubmit() {
    const club = <ClubModel>{
      Name_Club: this.changeForm.get('Name_Club').value,
      City: this.changeForm.get('City').value,
      Street: this.changeForm.get('Street').value,
      Build: this.changeForm.get('Build').value
    };
    this.loading = true;
    this.authService.addClub(club).subscribe(res => {
      this.router.navigate(['/club/', this.changeForm.get('Name_Club').value]);
    }, error => {
      console.error(error);
      this.loading = false;
    });
  }
}
