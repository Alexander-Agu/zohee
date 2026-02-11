import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { DocumentApiService } from '../../services/documents/document-api.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-upload',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: "./upload.component.html",
  styleUrl: './upload.component.css'
})
export class UploadComponent implements OnInit {
  // Initialize form with validators for better UX
  uploadForm = new FormGroup({
    file: new FormControl<File | null>(null, [Validators.required]) 
  });

  title = "";
  pdfSrc = ""

  constructor(
    private documentApi: DocumentApiService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.title = this.route.snapshot.paramMap.get('name') ?? '';

    this.documentApi.getDocumentPdf(this.title)
      .subscribe((blob: Blob) => {
        this.pdfSrc = URL.createObjectURL(blob);
    });
  }

  goBack(){
    this.location.back();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Patch the actual File object into the form
      this.uploadForm.patchValue({ file: file });
    }
  }

  onSubmit() {
    if (this.uploadForm.valid) {
      const formData = new FormData();
      console.log("Just work bruh");
      
      const file = this.uploadForm.get('file')?.value;
      if (file) {
        formData.append('file', file);
      }

      this.documentApi.SignDocument(formData, this.title);
    } else {
      this.uploadForm.markAllAsTouched();
    }
  }

}
