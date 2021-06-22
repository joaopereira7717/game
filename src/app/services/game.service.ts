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

  logIn(username: string, password: string) {
    let dataToSend: FormData = new FormData();

    dataToSend.append('username', username);
    dataToSend.append('password', password);

    localStorage.setItem('account', username);
    localStorage.setItem('password', password);

    return this.http.post(this.linkLogin, dataToSend);
  }

  signIn(username: string, password: string) {
    let dataToSend: FormData = new FormData();

    dataToSend.append('username', username);
    dataToSend.append('password', password);

    localStorage.setItem('account', username);
    localStorage.setItem('password', password);

    return this.http.post(this.linkSignUp, dataToSend);
  }

  logout() {
    localStorage.removeItem('account');
    localStorage.removeItem('password');
    localStorage.removeItem('id');
  }

  checkAuthentication() {
    let account = localStorage.getItem('account');
    if (account != null) {
      return true;
    }
    return false;
  }

  getCharById(): Observable<any> {
    return this.http.get(this.linkCharId + localStorage.getItem('id'));
  }

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

    return this.http
      .post(this.linkUpdateChar, formData)
      .toPromise()
      .then()
      .catch((err) => {
        return Promise.reject(err.error || 'Server error');
      });
  }
}
