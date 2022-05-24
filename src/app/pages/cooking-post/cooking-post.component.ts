import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookingPost } from 'src/app/models/cooking-post.model';
import { CookingService } from 'src/app/services/cooking.service';

@Component({
  selector: 'app-cooking-post',
  templateUrl: './cooking-post.component.html',
  styleUrls: ['./cooking-post.component.css']
})
export class CookingPostComponent implements OnInit {
  cookingPost: CookingPost;

  loadingPosts: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private cookingService: CookingService) { }

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.loadingPosts = true;
    this.cookingPost = await this.cookingService.getCookingPost(id);
    this.loadingPosts = false;
  }

}
