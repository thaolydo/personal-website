import { Component, ViewEncapsulation } from '@angular/core';

// import Swiper core and required modules
import SwiperCore, { EffectCube, Pagination, Navigation } from "swiper";

// install Swiper modules
SwiperCore.use([EffectCube, Pagination, Navigation]);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'personal-website';
}
