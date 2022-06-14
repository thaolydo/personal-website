import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPostDialogComponent } from 'src/app/components/add-post-dialog/add-post-dialog.component';
import { TravelPost } from 'src/app/models/travel-post.model';
import { TravelService } from 'src/app/services/travel.service';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {
  travelPosts: TravelPost[];

  loadingPosts: boolean = false;

  constructor(
    private travelService: TravelService,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    this.loadingPosts = true;
    this.travelPosts = await this.travelService.getTravelPosts();
    this.loadingPosts = false;
  }

  async addNewTravelPost() {
    const dialogRef = this.dialog.open(AddPostDialogComponent, {
      data: {
        postType: 'travel',
        title: 'Adding new Travel Post',
        isAdding: true
      }
    });

    const newTravelPost: TravelPost = await dialogRef.afterClosed().toPromise();
    if (newTravelPost) {
      console.log('newTravelPost =', newTravelPost);
      newTravelPost.pid = newTravelPost.title.trim().toLowerCase().replace(/\s/g, '-');
      this.loadingPosts = true;
      await this.travelService.saveTravelPost(newTravelPost);

      // Wait 1.5s for the thumbnail to be generated before adding the new post
      setTimeout(async () => {
        console.log('add the new post');
        this.travelPosts.push(newTravelPost);
        this.loadingPosts = false;
      }, 3000);
    }
  }

}
