import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddPostDialogComponent } from 'src/app/components/add-post-dialog/add-post-dialog.component';
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
    private dialog: MatDialog,
    private cookingService: CookingService) { }

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.loadingPost = true;
    this.cookingPost = await this.cookingService.getCookingPost(id);
    this.loadingPost = false;
  }

  async deletePost() {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }
    this.deleteingPost = true;
    const id = this.route.snapshot.params['id'];
    await this.cookingService.deleteCookingPost(id);
    this.router.navigate(['/cooking']);
    this.deleteingPost = false;
  }

  async editPost() {
    console.log('hi', window.screen.availWidth >= 768 ? `50vw` : undefined);
    const dialogRef = this.dialog.open(AddPostDialogComponent, {
      width: window.screen.availWidth >= 768 ? `50vw` : undefined,
      data: {
        title: 'Edit Cooking Post',
        isAdding: false,
        post: this.cookingPost,
        postType: 'cooking'
      }
    });

    const updatedCookingPost: CookingPost = await dialogRef.afterClosed().toPromise();
    if (updatedCookingPost) {
      this.cookingPost = {
        ...this.cookingPost,
        ...updatedCookingPost,
      }
      this.deleteingPost = true;
      await this.cookingService.saveCookingPost(this.cookingPost);
      this.deleteingPost = false;
    }
  }

}
