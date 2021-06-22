import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ArenaComponent } from './components/arena/arena.component';
import { CreatecharacterComponent } from './components/createcharacter/createcharacter.component';
import { CityComponent } from './components/city/city.component';
import { ShopComponent } from './components/shop/shop.component';
import { Four0fourComponent } from './components/four0four/four0four.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthGuard } from './system/guard/auth.guard';
import { TrainComponent } from './components/train/train.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArenaComponent,
    CreatecharacterComponent,
    CityComponent,
    ShopComponent,
    Four0fourComponent,
    NavbarComponent,
    TrainComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [AuthGuard, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
