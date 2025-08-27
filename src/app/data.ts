import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private storageKey = 'my_app_data_items';
  private items: { id: number; name: string; type: string; }[] = [];

  constructor() {
    this.loadItems();
  }

  // Load items from local storage
  private loadItems(): void {
    const storedItems = localStorage.getItem(this.storageKey);
    if (storedItems) {
      this.items = JSON.parse(storedItems);
    } else {
      // Initial data if local storage is empty
      this.items = [
        { id: 1, name: 'Apple', type: 'Fruit' },
        { id: 2, name: 'Carrot', type: 'Vegetable' },
        { id: 3, name: 'Banana', type: 'Fruit' },
        { id: 4, name: 'Broccoli', type: 'Vegetable' },
        { id: 5, name: 'Orange', type: 'Fruit' }
      ];
      this.saveItems();
    }
  }

  // Save items to local storage
  private saveItems(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  getItems() {
    return [...this.items];
  }

  addItem(newItem: { name: string; type: string; }): void {
    const newId = this.items.length > 0 ? Math.max(...this.items.map(item => item.id)) + 1 : 1;
    this.items.push({
      id: newId,
      name: newItem.name,
      type: newItem.type
    });
    this.saveItems();
  }

  // New method to remove a single item
  removeItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
    this.saveItems();
  }

  // New method to remove all items
  removeAllItems(): void {
    this.items = [];
    this.saveItems();
  }
}