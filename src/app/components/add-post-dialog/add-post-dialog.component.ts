import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadImageService } from 'src/app/services/upload-image.service';

@Component({
  selector: 'app-add-post-dialog',
  templateUrl: './add-post-dialog.component.html',
  styleUrls: ['./add-post-dialog.component.css']
})
export class AddPostDialogComponent implements OnInit {

  @ViewChild('imageUploadInput') imageUploadInput: ElementRef<HTMLInputElement>;
  @ViewChild('img') img: ElementRef<HTMLImageElement>;
  uploadingImage: boolean = false;

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private uploadImageService: UploadImageService,
  ) { }

  ngOnInit(): void {
    const post = this.data.post;
    this.form = this.fb.group({
      title: post?.title,
      description: post?.description,
      imageUrl: post?.imageUrl
    });
  }

  ngAfterViewInit() {
    const inputElement = this.imageUploadInput!.nativeElement;
    const fileReader = new FileReader();
    const imgElem = this.img.nativeElement;
    const postType = this.data.postType;
    inputElement.onchange = (event: any) => {
      console.log('On file selected');
      const file = event.target.files[0];
      if (!file) {
        return;
      }
      console.log('file =', file);
      fileReader.onload = async (e) => {
        console.log('file loaded');
        // Extract info for the image
        const base64 = fileReader.result as string;
        const tmp = base64.split(',');
        const imageType = tmp[0].split(';')[0].split('/')[1];
        const base64Data = tmp[1];
        const fileName = file.name;

        this.uploadingImage = true;
        imgElem.src = URL.createObjectURL(file);
        try {
          const imageUrl = await this.uploadImageService.uploadImage(postType, fileName, imageType, base64Data);
          imgElem.src = imageUrl;
          console.log('imageUrl =', imageUrl);
          this.form.get('imageUrl').setValue(imageUrl);
        } catch (e) {
          console.error(e);
          alert('Unable to upload the image. Please try a different image.');
        }
        this.uploadingImage = false;
      };
      fileReader.readAsDataURL(file);

      // Mark form as dirty
      this.form.markAsDirty();
    }

    // If editing, load the image
    if (!this.data.isAdding) {
      imgElem.src = this.data.post.imageUrl;
    }
  }

  onUploadImage() {
    console.log(`Uploading image`);
    const inputElement = this.imageUploadInput!.nativeElement;
    inputElement.click();
  }

}
