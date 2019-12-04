import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { AlertService } from './service/alert.service';
import { StoryService } from './story.service';
import { LibraryService } from './library.service';
import { MatSidenavModule } from "@angular/material/sidenav";
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { SearchComponent } from './search/search.component';
import { BannerComponent } from './banner/banner.component';
import { StoryComponent } from './story/story.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { AuthGuard } from './auth.guard';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { MaterialModule } from './material.module';
import { PlayerComponent } from './player/player.component';
import { AlertComponent } from './alert/alert.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MenuComponent,
    SearchComponent,
    BannerComponent,
    StoryComponent,
    HomeComponent,
    RegistrationComponent,
    FooterComponent,
    PlayerComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,      
    ReactiveFormsModule,  
    NgxAudioPlayerModule,
    RouterModule.forRoot([
      {
        path: 'home',
        component: HomeComponent,
        canActivate : [AuthGuard]
      },
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: 'story',
        component : StoryComponent,
        canActivate : [AuthGuard]
      },
      {
        path: '',
        component: LoginComponent
      }
    ]),
    FormsModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MaterialModule    
  ],
  providers: [AuthService, StoryService, LibraryService, AuthGuard, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }

