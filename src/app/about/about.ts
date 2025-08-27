import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';     


@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AboutComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form submitted successfully!', this.formData);
      alert('Form submitted successfully! Check the console for details.');
      form.resetForm();
    } else {
      console.log('Form is invalid.');
      alert('Please fill out all required fields.');
    }
  }
}