import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { toUpper } from 'lodash';
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
    await this.checkUserAuthenticated();
    if (this.authenticated) return true;
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/home']);
    alert('Precisa de estar Logado!');
    return false;
  }
}
