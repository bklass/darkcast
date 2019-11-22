import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { StoryService } from './story.service';
import { HttpClientModule } from '@angular/common/http';
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
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  
    ReactiveFormsModule,  
    RouterModule.forRoot([
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: 'story',
        component : StoryComponent
      },
      {
        path: '',
        component: LoginComponent
      }
    ]),
    FormsModule,
    MatSidenavModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService, StoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
