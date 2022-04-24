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

  constructor(
    private travelService: TravelService,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    this.travelPosts = await this.travelService.getTravelPosts();
  }

  async addNewTravelPost() {
    const dialogRef = this.dialog.open(AddPostDialogComponent, {
      data: {
        title: 'Adding new Travel Post'
      }
    });

    const newTravelPost: TravelPost = await dialogRef.afterClosed().toPromise();
    if (newTravelPost) {
      console.log('newTravelPost =', newTravelPost);
      newTravelPost.id = newTravelPost.title.toLowerCase().replace(' ', '-')
      await this.travelService.addTravelPost(newTravelPost);
      this.travelPosts.push(newTravelPost);
    }
  }

}
