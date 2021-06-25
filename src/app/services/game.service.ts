import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Player } from '../system/interfaces/player';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) {}

  // links da api
  linkLogin = 'http://moreiramoises.pt/server/apis/login.php';
  linkSignUp = 'http://moreiramoises.pt/server/apis/signup.php';
  linkCreateChar = 'http://moreiramoises.pt/server/apis/createChart.php';
  linkCharId = 'http://moreiramoises.pt/server/apis/get/getChar.php?PlayerID=';
  linkRndChar = 'http://moreiramoises.pt/server/apis/get/getRandomChar.php?';
  linkUpdateChar = 'http://moreiramoises.pt/server/apis/updateChart.php';
  linkCreateWeapon = 'http://moreiramoises.pt/server/apis/createArma.php';
  linkRandomWeapon =
    'http://moreiramoises.pt/server/apis/get/getRandomArma.php';
  linkGetWeaponByIdPlayer =
    'http://moreiramoises.pt/server/apis/get/getArma.php?IDPersonagem=';

  //login
  logIn(username: string, password: string) {
    let dataToSend: FormData = new FormData();

    dataToSend.append('username', username);
    dataToSend.append('password', password);

    localStorage.setItem('account', username);
    localStorage.setItem('password', password);

    return this.http.post(this.linkLogin, dataToSend);
  }
  //registar
  signIn(username: string, password: string) {
    let dataToSend: FormData = new FormData();

    dataToSend.append('username', username);
    dataToSend.append('password', password);

    localStorage.setItem('account', username);
    localStorage.setItem('password', password);

    return this.http.post(this.linkSignUp, dataToSend);
  }
  //logout
  logout() {
    localStorage.removeItem('account');
    localStorage.removeItem('password');
    localStorage.removeItem('id');
  }
  //verificar se está conectado
  checkAuthentication() {
    let account = localStorage.getItem('account');
    if (account != null) {
      return true; //se existir conta na localstorage retorna true
    }
    return false; //se não retorna false
  }
  //ir buscar o char pelo id
  getCharById(): Observable<any> {
    return this.http.get(this.linkCharId + localStorage.getItem('id'));
  }
  //ir buscar um random
  getRandomChar(): Observable<any> {
    return this.http.get(this.linkRndChar);
  }
  // update character
  updateStats(player: any) {
    const formData: FormData = new FormData();
    formData.append('name', player.Nome);
    formData.append('idChar', player.ID);
    formData.append('atk', player.Atk);
    formData.append('isMonster', 'false');
    formData.append('int', player.Int);
    formData.append('vida', player.Vida);

    let account: any = {
      username: localStorage.getItem('account'),
      password: localStorage.getItem('password'),
    };

    formData.append('username', account.username);
    formData.append('password', account.password);
    //unica forma que arranjei atravez de pesquisa para resolver um bug que tinha
    return this.http
      .post(this.linkUpdateChar, formData)
      .toPromise()
      .then()
      .catch((err) => {
        return Promise.reject(err.error || 'Server error');
      });
  }
  //criar arma
  createWeapon(
    name: string,
    atk: string,
    durabilidade: string,
    tipoArma: string,
    vida: string
  ) {
    const formData: FormData = new FormData();
    formData.append('name', name);
    formData.append('atk', atk);
    formData.append('durabilidade', durabilidade);
    formData.append('tipoDeArma', tipoArma);
    formData.append('vida', vida);

    let account: any = {
      username: localStorage.getItem('account'),
      password: localStorage.getItem('password'),
      id: localStorage.getItem('id'),
    };

    formData.append('username', account.username);
    formData.append('password', account.password);
    formData.append('idPersonagem', account.id);

    return this.http.post(this.linkCreateWeapon, formData);
  }
  //criar character
  createChar(
    name: string,
    ataque: string,
    inteligencia: string,
    saude: string,
    username: string,
    password: string
  ) {
    const formData: FormData = new FormData();
    formData.append('name', name);
    formData.append('atk', ataque);
    formData.append('isMonster', 'false');
    formData.append('int', inteligencia);
    formData.append('vida', saude);
    formData.append('username', username);
    formData.append('password', password);

    return this.http.post(this.linkCreateChar, formData);
  }
  //ir buscar as armas do player
  getWeaponByPlayerID(id: number) {
    return this.http.get(this.linkGetWeaponByIdPlayer + id);
  }
}
