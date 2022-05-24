import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookingPost } from 'src/app/models/cooking-post.model';
import { CookingService } from 'src/app/services/cooking.service';

@Component({
  selector: 'app-cooking-post',
  templateUrl: './cooking-post.component.html',
  styleUrls: ['./cooking-post.component.css']
})
export class CookingPostComponent implements OnInit {
  cookingPost: CookingPost;

  loadingPost: boolean = false;
  deleteingPost: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cookingService: CookingService) { }

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.loadingPost = true;
    this.cookingPost = await this.cookingService.getCookingPost(id);
    this.loadingPost = false;
  }
  
  async deletePost() {
    this.deleteingPost = true;
    const id = this.route.snapshot.params['id'];
    await this.cookingService.deleteCookingPost(id);
    this.router.navigate(['/cooking']);
    this.deleteingPost = false;
  }

  editPost() {

  }

}
