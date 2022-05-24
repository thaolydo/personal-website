import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TravelPost } from '../models/travel-post.model';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  travelApiUrl = environment.apiUrl + '/travel';

  constructor(private httpClient: HttpClient) {
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

  async getTravelPosts(): Promise<TravelPost[]> {
    // const travelPosts = JSON.parse(localStorage.getItem('travelPosts'));
    // const res = Object.entries(travelPosts).reduce((prev, cur) => {
    //   prev.push({
    //     id: cur[0],
    //     ...cur[1] as any
    //   })
    //   return prev;
    // }, []);
    // return Promise.resolve(res);
    const data: any = await this.httpClient.get(this.travelApiUrl).toPromise();
    return data.travelPosts;
  }
    
    async getTravelPost(id: string): Promise<TravelPost> {
      // const travelPosts = JSON.parse(localStorage.getItem('travelPosts'));
      // return Promise.resolve(travelPosts[id]);
      const data: any = await this.httpClient.get(`${this.travelApiUrl}/${id}`).toPromise();
      return data.travelPost;
  }

  saveTravelPost(travelPost: TravelPost): Promise<void> {
    // const travelPosts = JSON.parse(localStorage.getItem('travelPosts'));
    // travelPosts[travelPost.id] = travelPost;
    // localStorage.setItem('travelPosts', JSON.stringify(travelPosts));
    // return Promise.resolve();
    return this.httpClient.post<void>(this.travelApiUrl, travelPost).toPromise();
  }

  deleteTravelPost(id: string) {
    return this.httpClient.delete(this.travelApiUrl, {
      params: {
        pid: id
      }
    }).toPromise();
  }
}

