import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { BloggerComponent } from './pages/blogger/blogger.component';
import { CookingPostComponent } from './pages/cooking-post/cooking-post.component';
import { CookingComponent } from './pages/cooking/cooking.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { TravelPostComponent } from './pages/travel-post/travel-post.component';
import { TravelComponent } from './pages/travel/travel.component';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about-me', component: AboutMeComponent },
  { path: 'travel', component: TravelComponent },
  { path: 'travel/:id', component: TravelPostComponent },
  { path: 'cooking', component: CookingComponent },
  { path: 'cooking/:id', component: CookingPostComponent },
  { path: 'blogger', component: BloggerComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
