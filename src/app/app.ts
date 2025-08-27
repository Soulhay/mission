import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, FormsModule],
  template: `
    <nav>
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" i18n="@@homeLink">Home</a>
      <a routerLink="/about" routerLinkActive="active" i18n="@@aboutLink">About</a>
    </nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('test-app');
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2 i18n="@@aboutTitle">About Us</h2>
    <p i18n="@@aboutDescription">This page demonstrates a simple form with basic validation.</p>
    <form #contactForm="ngForm" (ngSubmit)="onSubmit(contactForm)">
      <div class="form-group">
        <label for="name" i18n="@@nameLabel">Name:</label>
        <input type="text" id="name" name="name" [(ngModel)]="formData.name" required #name="ngModel">
        <div *ngIf="name.invalid && (name.dirty || name.touched)" class="validation-error" i18n="@@nameRequired">
          Name is required.
        </div>
      </div>
      <div class="form-group">
        <label for="email" i18n="@@emailLabel">Email:</label>
        <input type="email" id="email" name="email" [(ngModel)]="formData.email" required email #email="ngModel">
        <div *ngIf="email.invalid && (email.dirty || email.touched)" class="validation-error">
          <div *ngIf="email.errors?.['required']" i18n="@@emailRequired">Email is required.</div>
          <div *ngIf="email.errors?.['email']" i18n="@@emailValid">Please enter a valid email.</div>
        </div>
      </div>
      <button type="submit" [disabled]="contactForm.invalid" i18n="@@submitButton">Submit</button>
    </form>
  `,
  styles: `
    .form-group { margin-bottom: 15px; }
    input { width: 100%; padding: 8px; box-sizing: border-box; }
    .validation-error { color: red; font-size: 0.8em; margin-top: 5px; }
  `
})
export class AboutComponent {
  formData = { name: '', email: '' };

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form submitted successfully!', this.formData);
      alert('Form submitted successfully!');
      form.resetForm();
    } else {
      console.log('Form is invalid.');
      alert('Please fill out all required fields.');
    }
  }
}