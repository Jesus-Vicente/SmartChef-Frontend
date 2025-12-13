import { Component, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
})
export class LoginPage implements ViewWillEnter {
  constructor(private renderer: Renderer2, private elRef: ElementRef) {}

  ionViewWillEnter() {
    console.log('ionViewWillEnter llamado, animacion iniciada');
    const ionContent = this.elRef.nativeElement.querySelector('ion-content');
    if (ionContent) {
      this.renderer.removeClass(ionContent, 'animate-fondo');
      void ionContent.offsetWidth;
      setTimeout(() => {
        this.renderer.addClass(ionContent, 'animate-fondo');
      }, 10);
    }
  }
}
