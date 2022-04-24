import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TravelPost } from 'src/app/models/travel-post.model';
import { TravelService } from 'src/app/services/travel.service';

@Component({
  selector: 'app-travel-post',
  templateUrl: './travel-post.component.html',
  styleUrls: ['./travel-post.component.css']
})
export class TravelPostComponent implements OnInit {
  travelPost: TravelPost;

  constructor(
    private route: ActivatedRoute,
    private travelService: TravelService) { }

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.travelPost = await this.travelService.getTravelPost(id);
  }

}
