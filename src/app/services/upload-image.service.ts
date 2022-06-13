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

    // Deprecated in favor of get-signed-url flow
    async uploadImage(postType: 'travel' | 'cooking', fileName: string, imageType: string, data: string): Promise<string> {
        console.log('Uploading image');
        const res = await this.httpClient.post<any>(`${this.apiUrl}/upload-image`, data, {
            params: {
                postType,
                fileName,
                imageType,
            }
        }).toPromise();

        return res.imageUrl;
    }

    // https://aws.amazon.com/blogs/compute/uploading-to-amazon-s3-directly-from-a-web-or-mobile-application
    getSignedUrl(postType: 'travel' | 'cooking', fileName: string, contentType: string): Promise<GetSignedUrlResponse> {
        console.log('Getting signed url');
        return this.httpClient.get<GetSignedUrlResponse>(`${this.apiUrl}/get-signed-url`, {
            params: {
                postType,
                fileName,
                contentType
            }
        }).toPromise();
    }

    uploadToSignedUrl(signedUrl: string, contentType: string, blob: Blob) {
        console.log('Uploading to signed url');
        return this.httpClient.put(signedUrl, blob, {
            headers: {
                'Content-Type': contentType,
            },
        }).toPromise();
    }
}

export interface GetSignedUrlResponse {
    key: string;
    signedUrl: string;
}