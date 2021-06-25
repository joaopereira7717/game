import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { GameService } from 'src/app/services/game.service';

@Injectable()
export class AuthGuard implements CanActivate {
  authenticated!: boolean;

  constructor(private router: Router, private gameservice: GameService) {}

  async checkUserAuthenticated() {
    var response = await this.gameservice.checkAuthentication();
    this.authenticated = response;
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    await this.checkUserAuthenticated(); //VERIFICA NA FUNÇÃO ACIMA SE ESTÁ COM CONTA (VERIFICA SE TEM TOKEN)
    if (this.authenticated) return true; //SE O QUE ESTA EM CIMA DER TRUE AQUI VAI DAR RETURN TRUE NO CASO PODE ACEDER A PAGINA
    this.router.navigate(['/home']); // CASO DÊ FALSE AQUI IRÁ O REDERECIONAR PARA O HOME (LOGIN)
    alert('Precisa de estar Logado!'); //AVISA QUE PRECISA DE LOGIN
    return false; //TERMINA A FUNÇÃO
  }
}
