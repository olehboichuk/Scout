import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {FullPlayerModel} from "../models/fullPlayer.model";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  public playerId: string;
  public loading = true;
  public player: FullPlayerModel;

  constructor(private authService: AuthService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('userId')) {
        this.playerId = paramMap.get('userId');
        this.authService.getPlayer(this.playerId).subscribe(res => {
          this.player = res.player;
          this.loading = false;
        }, error => {
          console.warn('no ok');
        });
      }
    });
  }

}
