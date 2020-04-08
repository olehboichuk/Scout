import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PlayerModel} from "../models/player.model";
import {Authentificationrequest} from "../models/authentificationrequest";
import {Token} from "../models/token";
import {Router} from "@angular/router";
import {FullPlayerModel} from "../models/fullPlayer.model";
import {UserModel} from "../models/user.model";
import {ContractModel} from "../models/contract.model";
import {PlayerWclubModel} from "../models/playerWclub.model";
import {FullStats} from "../models/fullStats";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private playerSeasonsURL = 'http://localhost:3000/api/seasons/';
  private playersURL = 'http://localhost:3000/api/player';
  private playerURL = 'http://localhost:3000/api/player/';
  private logInURL = 'http://localhost:3000/api/auth/login';
  private playerContractsURL = 'http://localhost:3000/api/player/clubs/';
  private registerURL = 'http://localhost:3000/api/auth/register';
  private updatePlayerURL = 'http://localhost:3000/api/player';
  private updatePositionsURL = 'http://localhost:3000/api/player/positions';
  public _logInUser = false;
  public _role = '';

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
    return this.http.get<{ players: PlayerWclubModel[] }>(this.playersURL);
  }

  login(user: Authentificationrequest) {
    return this.http.post<Token>(this.logInURL, user);
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("role");
    this._logInUser = false;
    this.router.navigate(['/login']);
  }

  registerUser(user: UserModel) {
    return this.http.post(this.registerURL, user);
  }

  getPlayer(id: string) {
    return this.http.get<{ player: PlayerWclubModel }>(this.playerURL + id);
  }

  updatePlayer(player: PlayerModel) {
    return this.http.put(this.updatePlayerURL, player);
  }

  deletePlayer(playerId: string) {
    return this.http.delete(this.playerURL + playerId);
  }

  getPlayerContracts(playerId: string) {
    return this.http.get<{ player: ContractModel }>(this.playerContractsURL + playerId);
  }

  getRole() {
    if (localStorage.getItem("role"))
      return localStorage.getItem("role");
    return '';
  }

  getSeasonsbyId(playerId: number, position: string) {
    return this.http.get<[{ Season: string }]>(this.playerSeasonsURL + position + '/player/' + playerId);
  }

  getStatsById(playerId: number, selectedSeason: { Season: string }, position: string) {
    return this.http.post<{ stats: FullStats }>(this.playerSeasonsURL + position + '/player/' + playerId, selectedSeason);
  }

  updatePositions(value: any) {
    return this.http.post(this.updatePositionsURL, value);
  }
}
