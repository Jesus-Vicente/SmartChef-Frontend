import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

@Injectable({
  providedIn: 'root'
})
export class FotoService {
  public async takePhoto() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 40
    });
    return capturedPhoto.dataUrl;
  }
}
