import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UploadImageService {

    apiUrl = environment.apiUrl;

    constructor(private httpClient: HttpClient) {
    }

    async uploadImage(postType: 'travel' | 'cooking', fileName: string, imageType: string, data: string): Promise<string> {
        console.log('Uploading image');
        const res = await this.httpClient.post<any>(`${this.apiUrl}/upload-image`, data, {
            params: {
                postType,
                fileName,
                'imageType': imageType,
            }
        }).toPromise();

        return res.imageUrl;
    }
}