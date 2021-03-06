import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPostDialogComponent } from 'src/app/components/add-post-dialog/add-post-dialog.component';
import { CookingPost } from 'src/app/models/cooking-post.model';
import { CookingService } from 'src/app/services/cooking.service';

@Component({
  selector: 'app-cooking',
  templateUrl: './cooking.component.html',
  styleUrls: ['./cooking.component.css']
})
export class CookingComponent implements OnInit {
  cookingPosts: CookingPost[];
  loadingPosts: boolean = false;


  constructor(private cookingService: CookingService,
    private dialog: MatDialog
    ) { }

  async ngOnInit()  {
    this.loadingPosts = true;
    this.cookingPosts = await this.cookingService.getCookingPosts();
    this.loadingPosts = false;
  }

  async addNewCookingPost() {
    const dialogRef = this.dialog.open(AddPostDialogComponent, {
      width: window.screen.availWidth >= 768 ? `50vw` : undefined,
      data: {
        postType: 'cooking',
        title: 'Adding new Cooking Post',
        isAdding: true
      }
    });

    const newCookingPost: CookingPost = await dialogRef.afterClosed().toPromise();
    if (newCookingPost) {
      console.log('newCookingPost =', newCookingPost);
      newCookingPost.pid = newCookingPost.title.trim().toLowerCase().replace(/\s/g, '-');
      this.loadingPosts = true;
      await this.cookingService.saveCookingPost(newCookingPost);

      // Wait 1.5s for the thumbnail to be generated before adding the new post
      setTimeout(async () => {
        console.log('add the new post');
        this.cookingPosts.push(newCookingPost);
        this.loadingPosts = false;
      }, 3000);
    }
  }

}
