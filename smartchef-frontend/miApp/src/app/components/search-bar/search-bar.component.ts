import { Component, EventEmitter, Output } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class SearchBarComponent {
  searchText: string = '';

  @Output() searchChange = new EventEmitter<string>();

  onSearchChange(event: any) {
    this.searchText = event.detail.value;
    this.searchChange.emit(this.searchText);
  }
}
