import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {
  public _authService: AuthService;

  constructor(private authService: AuthService, private router: Router) {
    this._authService = authService;
  }

  ngOnInit() {
  }

}
