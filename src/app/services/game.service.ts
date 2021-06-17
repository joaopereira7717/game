import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

    return this.http.post(this.linkLogin, dataToSend);
  }

  signIn(username: string, password: string) {
    let dataToSend: FormData = new FormData();

    dataToSend.append('username', username);
    dataToSend.append('password', password);

    return this.http.post(this.linkSignUp, dataToSend);
  }
}
