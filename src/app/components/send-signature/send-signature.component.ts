import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { DocumentApiService } from '../../services/documents/document-api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-send-signature',
  imports: [ReactiveFormsModule],
  templateUrl: "./send.signature.component.html",
  styleUrl: './send-signature.component.css'
})
export class SendSignatureComponent {
  // Initialize form with validators for better UX
  documentForm = new FormGroup({
    documentTitle: new FormControl("", [Validators.required]),
    userName: new FormControl("", [Validators.required]),
    phoneNumber: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    file: new FormControl<File | null>(null, [Validators.required])
  });

  constructor(
    private post: DocumentApiService,
    private location: Location
  ) {}

  goBack(){
    this.location.back();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Patch the actual File object into the form
      this.documentForm.patchValue({ file: file });
    }
  }

  onSubmit() {
    if (this.documentForm.valid) {
      const formData = new FormData();

      console.log("Hey")

      // Map form values to the exact names in your C# [FromForm] attributes
      formData.append('userName', this.documentForm.get('userName')?.value || '');
      formData.append('phoneNumber', this.documentForm.get('phoneNumber')?.value || '');
      formData.append('email', this.documentForm.get('email')?.value || '');
      formData.append('documentTitle', this.documentForm.get('documentTitle')?.value || '');
      
      const file = this.documentForm.get('file')?.value;
      if (file) {
        formData.append('file', file);
      }

      this.post.PostDocument(formData);
    } else {
      this.documentForm.markAllAsTouched();
    }
  }
}