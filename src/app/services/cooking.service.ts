import { Injectable } from '@angular/core';
import { CookingPost } from '../models/cooking-post.model';

@Injectable({
  providedIn: 'root'
})
export class CookingService {

  constructor() {
    if (!localStorage.getItem('cookingPosts')) {
      localStorage.setItem('cookingPosts', JSON.stringify({
        'egg-roll': {
          title: 'egg-roll',
          description: 'Eggroll homemade',
          imageUrl: 'https://natashaskitchen.com/wp-content/uploads/2020/10/Egg-Rolls-7-728x1092.jpg'
        }
      }));
    }
  }

  getCookingPosts(): Promise<CookingPost[]> {
    const cookingPosts = JSON.parse(localStorage.getItem('cookingPosts'));
    const res = Object.entries(cookingPosts).reduce((prev, cur) => {
      prev.push({
        id: cur[0],
        ...cur[1] as any
      })
      return prev;
    }, []);
    return Promise.resolve(res);
  }

  
  getCookingPost(id: string): Promise<CookingPost> {
    const cookingPosts = JSON.parse(localStorage.getItem('cookingPosts'));
    return Promise.resolve(cookingPosts[id]);
  }
  
  addCookingPost(cookingPost: CookingPost): Promise<void> {
    const cookingPosts = JSON.parse(localStorage.getItem('cookingPosts'));
    cookingPosts[cookingPost.id] = cookingPost;
    localStorage.setItem('cookingPosts', JSON.stringify(cookingPosts));
    return Promise.resolve();
  }
}  
