import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [ImageUploaderComponent],
  exports: [ImageUploaderComponent],
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class FileUploaderModule { }
