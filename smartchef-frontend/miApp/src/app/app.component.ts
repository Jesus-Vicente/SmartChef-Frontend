import { Component } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { RouterModule } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonicModule, RouterModule],
})
export class AppComponent {
  constructor() {}
}
