import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArenaComponent,
    CreatecharacterComponent,
    CityComponent,
    ShopComponent,
    Four0fourComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
