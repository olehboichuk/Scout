import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PlayerModel} from "../models/player.model";
import {Authentificationrequest} from "../models/authentificationrequest";
import {Token} from "../models/token";
import {Router} from "@angular/router";
import {FullPlayerModel} from "../models/fullPlayer.model";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private playersURL = 'http://localhost:3000/api/player';
  private playerURL = 'http://localhost:3000/api/player/';
  private logInURL = 'http://localhost:3000/api/auth/login';
  public _logInUser = false;
  constructor(private http: HttpClient, private router: Router) {
  }

  isLoggedIn() {
    //TODO add local Storage, token
    if (localStorage.getItem("id_token")) {
      return true;
    }
    return false;
  }

  getUsers() {
    return this.http.get<{ players: PlayerModel[] }>(this.playersURL);
  }

  login(user: Authentificationrequest){
    return this.http.post<Token>(this.logInURL, user);
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("role");
    this._logInUser = false;
    this.router.navigate(['/login']);
  }

  getPlayer(id: string) {
    return this.http.get<{ player: FullPlayerModel }>(this.playerURL + id);
  }
}
