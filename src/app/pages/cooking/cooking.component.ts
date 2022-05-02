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


  constructor(private cookingService: CookingService,
    private dialog: MatDialog
    ) { }

  async ngOnInit()  {
    this.cookingPosts = await this.cookingService.getCookingPosts();
  }

  async addNewTravelPost() {
    const dialogRef = this.dialog.open(AddPostDialogComponent, {
      data: {
        title: 'Adding new Travel Post'
      }
    });

    const newCookingPost: CookingPost = await dialogRef.afterClosed().toPromise();
    if (newCookingPost) {
      console.log('newTravelPost =', newCookingPost);
      newCookingPost.id = newCookingPost.title.toLowerCase().replace(' ', '-')
      await this.cookingService.addCookingPost(newCookingPost);
      this.cookingPosts.push(newCookingPost);
    }
  }

}
