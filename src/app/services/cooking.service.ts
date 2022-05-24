import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookingPost } from '../models/cooking-post.model';

@Injectable({
  providedIn: 'root'
})
export class CookingService {
  cookingApiUrl = environment.apiUrl + '/cooking';

  constructor(private httpClient: HttpClient) {
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

  async getCookingPosts(): Promise<CookingPost[]> {
    // const cookingPosts = JSON.parse(localStorage.getItem('cookingPosts'));
    // const res = Object.entries(cookingPosts).reduce((prev, cur) => {
    //   prev.push({
    //     id: cur[0],
    //     ...cur[1] as any
    //   })
    //   return prev;
    // }, []);
    // return Promise.resolve(res);
    const data: any = await this.httpClient.get(this.cookingApiUrl).toPromise();
    return data.cookingPosts;
  }
  
  
  async getCookingPost(id: string): Promise<CookingPost> {
    // const cookingPosts = JSON.parse(localStorage.getItem('cookingPosts'));
    // return Promise.resolve(cookingPosts[id]);
    const data: any = await this.httpClient.get(`${this.cookingApiUrl}/${id}`).toPromise();
    return data.cookingPost;
  }
  
  saveCookingPost(cookingPost: CookingPost): Promise<void> {
    // const cookingPosts = JSON.parse(localStorage.getItem('cookingPosts'));
    // cookingPosts[cookingPost.id] = cookingPost;
    // localStorage.setItem('cookingPosts', JSON.stringify(cookingPosts));
    // return Promise.resolve();
    return this.httpClient.post<void>(this.cookingApiUrl, cookingPost).toPromise();
  }

  deleteCookingPost(id: string) {
    return this.httpClient.delete(this.cookingApiUrl, {
      params: {
        pid: id
      }
    }).toPromise();
  }

}  
