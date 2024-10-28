import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { BloggerComponent } from './pages/blogger/blogger.component';
import { CookingPostComponent } from './pages/cooking-post/cooking-post.component';
import { CookingComponent } from './pages/cooking/cooking.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { TravelPostComponent } from './pages/travel-post/travel-post.component';
import { TravelComponent } from './pages/travel/travel.component';
import { WeddingComponent } from './pages/wedding/wedding.component';

const routes: Routes = [
  { path: '', redirectTo: '/wedding', pathMatch: 'full' },
  { path: 'about-me', component: AboutMeComponent },
  { path: 'wedding', component: WeddingComponent },
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
