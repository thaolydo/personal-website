import { Injectable } from '@angular/core';
import { TravelPost } from '../models/travel-post.model';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  constructor() {
    if (!localStorage.getItem('travelPosts')) {
      localStorage.setItem('travelPosts', JSON.stringify({
        'lake-tahoe': {
          title: 'Lake Tahoe',
          description: 'Lake Tahoe beautiful',
          imageUrl: 'https://imengine.public.prod.sci.navigacloud.com/?uuid=2618e6cb-d3ba-58be-92e6-c45737d1b8d6&type=preview&width=4032&height=3024&q=60'
        }
      }));
    }
  }

  getTravelPosts(): Promise<TravelPost[]> {
    const travelPosts = JSON.parse(localStorage.getItem('travelPosts'));
    const res = Object.entries(travelPosts).reduce((prev, cur) => {
      prev.push({
        id: cur[0],
        ...cur[1] as any
      })
      return prev;
    }, []);
    return Promise.resolve(res);
  }

  getTravelPost(id: string): Promise<TravelPost> {
    const travelPosts = JSON.parse(localStorage.getItem('travelPosts'));
    return Promise.resolve(travelPosts[id]);
  }

  addTravelPost(travelPost: TravelPost): Promise<void> {
    const travelPosts = JSON.parse(localStorage.getItem('travelPosts'));
    travelPosts[travelPost.id] = travelPost;
    localStorage.setItem('travelPosts', JSON.stringify(travelPosts));
    return Promise.resolve();
  }
}

