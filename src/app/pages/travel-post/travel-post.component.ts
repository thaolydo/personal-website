import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddPostDialogComponent } from 'src/app/components/add-post-dialog/add-post-dialog.component';
import { TravelPost } from 'src/app/models/travel-post.model';
import { TravelService } from 'src/app/services/travel.service';

@Component({
  selector: 'app-travel-post',
  templateUrl: './travel-post.component.html',
  styleUrls: ['./travel-post.component.css']
})
export class TravelPostComponent implements OnInit {
  travelPost: TravelPost;

  loadingPost: boolean = true;
  deleteingPost: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private travelService: TravelService) { }

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.loadingPost = true;
    this.travelPost = await this.travelService.getTravelPost(id);
    this.loadingPost = false;
  }

  async deletePost() {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }
    this.deleteingPost = true;
    const id = this.route.snapshot.params['id'];
    await this.travelService.deleteTravelPost(id);
    this.router.navigate(['/travel']);
    this.deleteingPost = false;
  }

  async editPost() {
    const dialogRef = this.dialog.open(AddPostDialogComponent, {
      data: {
        title: 'Edit Travel Post',
        isAdding: false,
        post: this.travelPost
      }
    });

    const updatedTravelPost: TravelPost = await dialogRef.afterClosed().toPromise();
    this.travelPost = {
      ...this.travelPost,
      ...updatedTravelPost,
    }
    this.deleteingPost = true;
    await this.travelService.saveTravelPost(this.travelPost);
    this.deleteingPost = false;
  }

}
