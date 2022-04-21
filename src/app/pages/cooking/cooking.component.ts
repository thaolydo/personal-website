import { Component, OnInit } from '@angular/core';
import { CookingPost } from 'src/app/models/cooking-post.model';
import { CookingService } from 'src/app/services/cooking.service';

@Component({
  selector: 'app-cooking',
  templateUrl: './cooking.component.html',
  styleUrls: ['./cooking.component.css']
})
export class CookingComponent implements OnInit {
  cookingPosts: CookingPost[];

  constructor(private cookingService: CookingService) { }

  async ngOnInit()  {
    this.cookingPosts = await this.cookingService.getCookingPosts();
  }

}
