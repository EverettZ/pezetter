import { StorageCollections } from './../../constants/collections';
import { Injectable } from '@angular/core';
import { AuthProcessService } from 'ngx-auth-firebaseui';
import { AngularFireStorage } from '@angular/fire/storage';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  constructor(
    private auth: AuthProcessService,
    private afstorage: AngularFireStorage
  ) { } 

  uploadImage(image: File) {
    const namePrefix = this.auth.user ? this.auth.user.uid : `${Date.now()}`;
    const storageRef = this.afstorage.ref(`${StorageCollections.IMAGES}/${namePrefix}_${image.name}`);
    return from(storageRef.put(image))
  }

}
