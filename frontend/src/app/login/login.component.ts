import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Authentificationrequest} from "../models/authentificationrequest";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private error = '';
  private loading = false;

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
  }

  onSubmit() {
    this.do_login();
  }

  public do_login(): void {
    const user = <Authentificationrequest>{
      login: this.loginForm.get('login').value,
      password: this.loginForm.get('password').value
    };
    this.loading = true;
    this.loginForm.controls['login'].disable();
    this.loginForm.controls['password'].disable();
    this.authService.login(user)
      .subscribe(data => {
          localStorage.setItem("id_token", data.token);
          localStorage.setItem("role", data.role);
          this.router.navigate(['/players']);
        },
        error => {
          this.error = error.error;
          this.loading = false;
          this.loginForm.controls['login'].enable();
          this.loginForm.controls['password'].enable();
        });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
}

