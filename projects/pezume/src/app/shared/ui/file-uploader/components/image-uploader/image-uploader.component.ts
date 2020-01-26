import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ImagesService } from '../../../../services/images/images.service';
import { map, switchMap } from 'rxjs/operators';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'pez-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {

  selectedFile: ImageSnippet;
  @Output() onSuccess: EventEmitter<any> = new EventEmitter();
  @Output() onError: EventEmitter<any> = new EventEmitter();
  // @Input() imageUrl: string = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";

  constructor(private imagesService: ImagesService) { }

  ngOnInit() {
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.imagesService.uploadImage(this.selectedFile.file)
        .pipe(
          switchMap((snapshot) => {
            return snapshot.ref.getDownloadURL()
          })
        ).subscribe(ok => {
          this.onSuccess.emit(ok)
        }, (err) => {
          this.onError.emit(err);
        });

    });

    reader.readAsDataURL(file);
  }

}
