import { Component } from '@angular/core';
import { Location } from '@angular/common';
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

  // NEW: Getter to help the HTML show the "File Ready" state
  get selectedFile(): File | null {
    return this.templateForm.get('file')?.value || null;
  }

  goBack(): void {
    this.location.back();
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.templateForm.patchValue({
        file: input.files[0]
      });
      // Trigger validation check
      this.templateForm.get('file')?.updateValueAndValidity();
    }
  }

  createTemplate(): void {
    if (this.templateForm.invalid) {
      this.templateForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    
    // Using non-null assertion since we checked validity above
    formData.append(
      'templateTitle',
      this.templateForm.get('templateTitle')?.value!
    );

    const file = this.selectedFile;
    if (file) {
      formData.append('file', file);
    }

    this.templateApi.PostTemplate(formData);
  }
}