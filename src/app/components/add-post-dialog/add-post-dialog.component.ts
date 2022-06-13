import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadImageService } from 'src/app/services/upload-image.service';

@Component({
  selector: 'app-add-post-dialog',
  templateUrl: './add-post-dialog.component.html',
  styleUrls: ['./add-post-dialog.component.css']
})
export class AddPostDialogComponent implements OnInit {

  @ViewChild('img') img: ElementRef<HTMLImageElement>;
  selectedFile: File;
  uploadingImage: boolean = false;
  savingPost: boolean = false;
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private uploadImageService: UploadImageService,
  ) { }

  ngOnInit(): void {
    const post = this.data.post;
    this.form = this.fb.group({
      title: [post?.title, Validators.required],
      description: [post?.description, Validators.required],
      imageUrl: post?.imageUrl,
    });
  }

  onFileSelected(file: File) {
    if (!file) {
      return;
    }
    this.img.nativeElement.src = URL.createObjectURL(file);
    this.selectedFile = file;
    this.form.markAsDirty();
  }

  async onSave() {
    if (!this.selectedFile) {
      return;
    }

    // Upload the image
    this.uploadingImage = true;
    this.dialogRef.disableClose = true;
    try {
      const fileExtension = this.selectedFile.name.split('.').pop();
      const fileName = `${this.form.get('title').value.toLowerCase().replace(/\s/g, '-')}.${fileExtension}`;
      const signedUrlResponse = await this.uploadImageService.getSignedUrl(this.data.postType, fileName, this.selectedFile.type);
      await this.uploadImageService.uploadToSignedUrl(signedUrlResponse.signedUrl, this.selectedFile.type, this.selectedFile);
      this.form.get('imageUrl').setValue(`https://peronsal-website-storage.s3.us-west-1.amazonaws.com/${signedUrlResponse.key}`);
    } catch (e) {
      console.error(e);
      alert('Unable to upload the image. Please try again.');
    } finally {
      this.dialogRef.disableClose = false;
      this.uploadingImage = false;
    }

    this.dialogRef.close(this.form.value);
  }

}