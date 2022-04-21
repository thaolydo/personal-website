import { Injectable } from '@angular/core';
import { CookingPost } from '../models/cooking-post.model';

@Injectable({
  providedIn: 'root'
})
export class CookingService {

  constructor() { }

  getCookingPosts(): Promise<CookingPost[]> {
    return Promise.resolve([
      {
        id: 'egg-roll',
        title: 'Egg Roll',
        description: 'Eggroll homemade',
        imageUrl: 'https://natashaskitchen.com/wp-content/uploads/2020/10/Egg-Rolls-7-728x1092.jpg'
      },
    ] as CookingPost[]);
  }

  getCookingPost(id: string): Promise<CookingPost> {
    return Promise.resolve(
      {
        id: 'egg-roll',
        title: 'Egg Roll',
        description: 'Eggroll homemade',
        imageUrl: 'https://natashaskitchen.com/wp-content/uploads/2020/10/Egg-Rolls-7-728x1092.jpg'
      }
    );
  }
}
