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

  async addNewTravelPost() {
    const dialogRef = this.dialog.open(AddPostDialogComponent, {
      data: {
        postType: 'cooking',
        title: 'Adding new Cooking Post',
        isAdding: true
      }
    });

    const newCookingPost: CookingPost = await dialogRef.afterClosed().toPromise();
    if (newCookingPost) {
      console.log('newTravelPost =', newCookingPost);
      newCookingPost.pid = newCookingPost.title.toLowerCase().replace(/\s/g, '-')
      this.loadingPosts = true;
      await this.cookingService.saveCookingPost(newCookingPost);
      this.loadingPosts = false;
      this.cookingPosts.push(newCookingPost);
    }
  }

}
