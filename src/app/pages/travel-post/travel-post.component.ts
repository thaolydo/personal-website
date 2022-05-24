import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private travelService: TravelService) { }

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.loadingPost = true;
    this.travelPost = await this.travelService.getTravelPost(id);
    this.loadingPost = false;
  }

  async deletePost() {
    this.deleteingPost = true;
    const id = this.route.snapshot.params['id'];
    await this.travelService.deleteTravelPost(id);
    this.router.navigate(['/travel']);
    this.deleteingPost = false;
  }

  editPost() {

  }

}
