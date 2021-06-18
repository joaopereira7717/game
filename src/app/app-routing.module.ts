import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArenaComponent } from './components/arena/arena.component';
import { CityComponent } from './components/city/city.component';
import { CreatecharacterComponent } from './components/createcharacter/createcharacter.component';
import { Four0fourComponent } from './components/four0four/four0four.component';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { AuthGuard } from './system/guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'createCharacter',
    component: CreatecharacterComponent,
  },
  { path: 'city', component: CityComponent, canActivate: [AuthGuard] },
  { path: 'arena', component: ArenaComponent, canActivate: [AuthGuard] },
  { path: 'shop', component: ShopComponent, canActivate: [AuthGuard] },
  { path: '**', component: Four0fourComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
