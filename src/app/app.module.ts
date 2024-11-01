import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CookingComponent } from './pages/cooking/cooking.component';
import { BloggerComponent } from './pages/blogger/blogger.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TravelComponent } from './pages/travel/travel.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CookingPostComponent } from './pages/cooking-post/cooking-post.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { TravelPostComponent } from './pages/travel-post/travel-post.component';
import { AddPostDialogComponent } from './components/add-post-dialog/add-post-dialog.component';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';

import { SwiperModule } from 'swiper/angular';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WeddingComponent } from './pages/wedding/wedding.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    CookingComponent,
    BloggerComponent,
    NavBarComponent,
    TravelComponent,
    AboutMeComponent,
    CookingPostComponent,
    TravelPostComponent,
    AddPostDialogComponent,
    FooterComponent,
    WeddingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatRippleModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    SwiperModule,
    MatMenuModule,
    MatSnackBarModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
