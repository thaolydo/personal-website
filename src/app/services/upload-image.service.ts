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
    getSignedUrl(filePath: 'travel' | 'cooking' | 'wedding', fileName: string, contentType: string): Promise<GetSignedUrlResponse> {
        console.log('Getting signed url');
        return this.httpClient.get<GetSignedUrlResponse>(`${this.apiUrl}/get-signed-url`, {
            params: {
                filePath,
                fileName,
                contentType
            }
        }).toPromise();
    }

    getSignedUrlV2(filePath: string, fileName: string): Promise<GetSignedUrlResponse> {
        console.log('Getting signed url');
        return this.httpClient.get<GetSignedUrlResponse>(`${this.apiUrl}/get-signed-url`, {
            params: {
                filePath,
                fileName,
            }
        }).toPromise();
    }

    // Deprecated in favor of uploadToSignedPostUrl below
    uploadToSignedUrl(signedUrl: string, contentType: string, blob: Blob) {
        console.log('Uploading to signed url');
        return this.httpClient.put(signedUrl, blob, {
            headers: {
                'Content-Type': contentType,
            },
        }).toPromise();
    }

    // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_s3_presigned_post.html
    uploadToSignedPostUrl(signedUrl: string, fields: any, blob: Blob) {
        console.log('Uploading to signed url POST');

        // Generatinig form data following this post: https://www.webiny.com/blog/upload-files-to-aws-s3-using-pre-signed-post-data-and-a-lambda-function-7a9fb06d56c1
        const formData = new FormData();
        Object.keys(fields).forEach(key => {
            formData.append(key, fields[key]);
        });
        formData.append('acl', 'public-read');

        // Actual file has to be appended last.
        formData.append("file", blob);
        return this.httpClient.post(signedUrl, formData).toPromise();
    }

    getWeddingUrls(): Promise<any> {
        console.log('Getting wedding urls');
        return this.httpClient.get(`${this.apiUrl}/wedding/get-wedding-urls`).toPromise();
    }

}

export interface GetSignedUrlResponse {
    // key: string; // only used for getSignedUrl PUT flow
    // signedUrl: string; // only used for getSignedUrl PUT flow
    url: string;
    fields: { [key: string]: string };
}