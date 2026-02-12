import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { DocumentApiService } from '../../services/documents/document-api.service';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { TemplateApiService } from '../../services/Template/template-api.service';

@Component({
  selector: 'app-templaate',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './templaate.component.html',
  styleUrl: './templaate.component.css'
})
export class TemplaateComponent {

  templateForm = new FormGroup({
    templateTitle: new FormControl('', [Validators.required]),
    file: new FormControl<File | null>(null, [Validators.required])
  });

  constructor(
    private location: Location,
    private templateApi: TemplateApiService
  ) {}

  goBack(): void {
    this.location.back();
  }

  // capture file properly
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.templateForm.patchValue({
        file: input.files[0]
      });
    }
  }

  createTemplate(): void {

    if (!this.templateForm.valid) {
      this.templateForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    formData.append(
      'templateTitle',
      this.templateForm.get('templateTitle')?.value ?? ''
    );

    const file = this.templateForm.get('file')?.value;
    if (file) {
      formData.append('file', file);
    }

    this.templateApi.PostTemplate(formData);
  }
}
