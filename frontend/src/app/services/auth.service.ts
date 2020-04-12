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
import {DefenderModel} from "../models/defender.model";
import {ForwardModel} from "../models/forward.model";
import {GoalkeeperModel} from "../models/goalkeeper.model";
import {HalfbackModel} from "../models/halfback.model";
import {ClubModel} from "../models/club.model";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private playerSeasonsURL = 'http://localhost:3000/api/seasons/';
  private playersURL = 'http://localhost:3000/api/player';
  private playerURL = 'http://localhost:3000/api/player/';
  private clubsURL = 'http://localhost:3000/api/club';
  private logInURL = 'http://localhost:3000/api/auth/login';
  private playerContractsURL = 'http://localhost:3000/api/player/clubs/';
  private registerURL = 'http://localhost:3000/api/auth/register';
  private updatePlayerURL = 'http://localhost:3000/api/player';
  private updatePositionsURL = 'http://localhost:3000/api/player/positions';
  private getAllClubsNamesURL = 'http://localhost:3000/api/clubs/names';
  private addContractURL = 'http://localhost:3000/api/player/contract';
  private deleteContractURL = 'http://localhost:3000/api/player/contract/delete';
  private addDefenderURL = 'http://localhost:3000/api/player/stats/defender';
  private addForwardURL = 'http://localhost:3000/api/player/stats/forward';
  private addGoalkeeperURL = 'http://localhost:3000/api/player/stats/goalkeeper';
  private addHalfbackURL = 'http://localhost:3000/api/player/stats/halfback';
  private filtersURL = 'http://localhost:3000/api/filters';
  public _logInUser = false;
  public _role = '';
  private deleteStatsForwardURL = 'http://localhost:3000/api/player/stats/forward/delete';
  private deleteStatsHalfbackURL = 'http://localhost:3000/api/player/stats/halfback/delete';
  private deleteStatsDefenderURL = 'http://localhost:3000/api/player/stats/defender/delete';
  private deleteStatsGoalkeeperURL = 'http://localhost:3000/api/player/stats/goalkeeper/delete';


  constructor(private http: HttpClient, private router: Router) {
  }

  isLoggedIn() {
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

  addPlayer(player: PlayerModel) {
    return this.http.post(this.updatePlayerURL, player);
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

  getAllClubsNames() {
    return this.http.get(this.getAllClubsNamesURL);
  }

  addContract(contract: { Contract_End: any; Number_Licenses: number; Contract_Start: any; Name_Club: any }) {
    return this.http.post(this.addContractURL, contract);
  }

  updateContract(contract: { Previous_Name_Club: string; Contract_End: string; Number_Licenses: number; Contract_Start: string; Previous_Contract_Start: string; Name_Club: any }) {
    return this.http.put(this.addContractURL, contract);
  }

  deleteContract(contract: { Number_Licenses: number; Contract_Start: string; Name_Club: string }) {
    return this.http.post(this.deleteContractURL, contract);
  }

  addDefender(defender: DefenderModel) {
    return this.http.post(this.addDefenderURL, defender);
  }

  addForward(forward: ForwardModel) {
    return this.http.post(this.addForwardURL, forward);
  }

  addGoalkeeper(goalkeeper: GoalkeeperModel) {
    return this.http.post(this.addGoalkeeperURL, goalkeeper);
  }

  addHalfback(halfback: HalfbackModel) {
    return this.http.post(this.addHalfbackURL, halfback);
  }

  deleteStatsForward(stat: { Number_Licenses: number; Season: string }) {
    return this.http.post(this.deleteStatsForwardURL, stat);
  }

  deleteStatsHalfback(stat: { Number_Licenses: number; Season: string }) {
    return this.http.post(this.deleteStatsHalfbackURL, stat);
  }

  deleteStatsDefender(stat: { Number_Licenses: number; Season: string }) {
    return this.http.post(this.deleteStatsDefenderURL, stat);
  }

  deleteStatsGoalkeeper(stat: { Number_Licenses: number; Season: string }) {
    return this.http.post(this.deleteStatsGoalkeeperURL, stat);
  }

  updateDefender(defender: DefenderModel) {
    return this.http.put(this.addDefenderURL, defender);
  }

  updateForward(forward: ForwardModel) {
    return this.http.put(this.addForwardURL, forward);
  }

  updateHalfback(halfback: HalfbackModel) {
    return this.http.put(this.addHalfbackURL, halfback);
  }

  updateGoalkeeper(goalkeeper: GoalkeeperModel) {
    return this.http.put(this.addGoalkeeperURL, goalkeeper);
  }

  getFilterData() {
    return this.http.get(this.filtersURL);
  }

  doFilter(filtersData: { Min_Age: number; Kicking_Leg: any; Min_Coast: number; Max_Coast: number; Positions: any; Max_Age: number }) {
    return this.http.post<{ players: PlayerWclubModel[] }>(this.filtersURL, filtersData);
  }

  getClubs() {
    return this.http.get<{ players: ClubModel[] }>(this.clubsURL);
  }

  getClub(clubName: string) {
    return this.http.get<{ club: ClubModel }>(this.clubsURL + '/' + clubName);
  }

  deleteClub(clubName: string) {
    return this.http.delete(this.clubsURL + '/' + clubName);
  }

  updateClub(club: ClubModel, clubName: string) {
    return this.http.put(this.clubsURL + '/' + clubName, club);
  }

  addClub(club: ClubModel) {
    return this.http.post(this.clubsURL, club);
  }
}
