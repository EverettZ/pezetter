import { StorageCollections } from './../../constants/collections';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  constructor(
    private auth: AngularFireAuth,
    private afstorage: AngularFireStorage
  ) { } 

  uploadImage(image: File) {
    return this.auth.user.pipe(
      map(user => {
        return user ? user.uid : `${Date.now()}`;
      }),
      mergeMap(namePrefix => {
        const storageRef = this.afstorage.ref(`${StorageCollections.IMAGES}/${namePrefix}_${image.name}`);
        return from(storageRef.put(image))
      })
    )
  }

}
