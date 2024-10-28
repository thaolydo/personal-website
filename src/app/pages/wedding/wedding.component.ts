import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadImageService } from 'src/app/services/upload-image.service';

@Component({
  selector: 'app-wedding',
  templateUrl: './wedding.component.html',
  styleUrls: ['./wedding.component.css']
})
export class WeddingComponent implements OnInit {

  @ViewChild('img') img: ElementRef<HTMLImageElement>;
  curFile: File;
  loadingImages: boolean = false;
  uploadingImage: boolean = false;
  IMAGE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

  objects: any[] = [];

  constructor(
    private uploadImageService: UploadImageService,
    private snackBar: MatSnackBar,
  ) { }

  async ngOnInit() {
    try {
      this.loadingImages = true;
      const data = await this.uploadImageService.getWeddingUrls();
      for (const object of data.objects) {
        let isImage = false;
        if (this.IMAGE_TYPES.includes(object.Key.split('.').pop().toLowerCase())) {
          isImage = true;
        }
        this.objects.push({
          url: `https://personal-website-storage.s3.us-west-1.amazonaws.com/${object.Key}`,
          isImage,
        });
      }
    } catch (e) {
      console.error('Unable to load images', e);
      alert("Sorry, you can't see our pics :(");
    } finally {
      this.loadingImages = false;
    }
  }

  async onFilesSelected(files: File[]) {
    // Validation
    if (!files) {
      return;
    }
    for (const file of files) {
      if (file.size >= 5_000_000_000) {
        alert('File size must not exceed 5GB.');
        return;
      }
    }

    // Upload the image
    this.uploadingImage = true;
    try {
      for (const file of files) {
        this.curFile = file;
        const source = URL.createObjectURL(file);
        this.img.nativeElement.src = source;
        const signedUrlResponse = await this.uploadImageService.getSignedUrl('wedding', file.name, file.type);
        await this.uploadImageService.uploadToSignedPostUrl(signedUrlResponse.url, signedUrlResponse.fields, file);
        alert('Files uploaded successfully');
        location.reload();
      }

      // Done uploading
      // this.snackBar.open('Files uploaded successfully', '', { duration: 5000 })
    } catch (e) {
      console.error('Unable to upload the image', e);
      if (e instanceof HttpErrorResponse) {
        if ((e.error as string).includes('exceeds the maximum allowed size')) {
          alert('File must not exceed 30MB.');
        }
      } else {
        alert('Unable to upload the image. Please try again.');
      }
      return;
    } finally {
      this.uploadingImage = false;
      this.img.nativeElement.hidden = true;
    }
  }

}
