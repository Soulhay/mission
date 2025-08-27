import { Component, OnInit } from '@angular/core';
import { DataService } from '../data';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

const listAnimation = trigger('listAnimation', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(-20px)' }),
      stagger(100, [
        animate('0.4s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true }),
    query(':leave', [
      stagger(100, [
        animate('0.2s ease-in', style({ opacity: 0, transform: 'translateY(20px)' }))
      ])
    ], { optional: true })
  ])
]);

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  animations: [listAnimation]
})
export class HomeComponent implements OnInit {
  items: any[] = [];
  filteredItems: any[] = [];
  filterText: string = '';
  showList: boolean = true;
  
  newItem = {
    name: '',
    type: ''
  };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadItems();
  }
  
  loadItems() {
    this.items = this.dataService.getItems();
    this.filterItems();
  }

  filterItems() {
    this.filteredItems = this.items.filter(item =>
      item.name.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }
  
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.dataService.addItem(this.newItem);
      this.loadItems();
      form.resetForm();
    }
  }

  // New method to remove a single item
  removeItem(id: number) {
    this.dataService.removeItem(id);
    this.loadItems();
  }

  // New method to remove all items
  removeAllItems() {
    if (confirm('Are you sure you want to remove all items? This cannot be undone.')) {
      this.dataService.removeAllItems();
      this.loadItems();
    }
  }

  // New method to save data to a .txt file
  saveToTextFile() {
    const data = this.items.map(item => `${item.name} (${item.type})`).join('\n');
    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-items.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
  
  toggleListVisibility() {
    this.showList = !this.showList;
  }
}