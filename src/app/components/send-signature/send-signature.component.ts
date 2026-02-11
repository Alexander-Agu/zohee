import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { DocumentApiService } from '../../services/documents/document-api.service';
import { Location } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-send-signature',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PdfViewerModule,
    RouterLink
  ],
  templateUrl: './send.signature.component.html',
  styleUrl: './send-signature.component.css'
})
export class SendSignatureComponent implements OnInit, OnDestroy {
  documentForm = new FormGroup({
    documentTitle: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });

  title = '';
  pdfSrc = '';

  // file created from backend blob
  private fetchedFile: File | null = null;

  constructor(
    private documentApi: DocumentApiService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.title = this.route.snapshot.paramMap.get('name') ?? '';

    this.documentForm.patchValue({
      documentTitle: this.title
    });

    this.documentApi.getDocumentPdf(this.title)
      .subscribe((blob: Blob) => {

        // display pdf
        this.pdfSrc = URL.createObjectURL(blob);

        // convert blob -> file for FormData
        this.fetchedFile = new File(
          [blob],
          `${this.title}.pdf`,
          { type: 'application/pdf' }
        );
      });
  }

  // Clean up memory
  ngOnDestroy(): void {
    if (this.pdfSrc) {
      URL.revokeObjectURL(this.pdfSrc);
    }
  }


  goBack(): void {
    this.router.navigate(['']);
  }


  onSubmit(): void {

    if (!this.documentForm.valid || !this.fetchedFile) {
      this.documentForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    formData.append('userName', this.documentForm.get('userName')?.value ?? '');
    formData.append('phoneNumber', this.documentForm.get('phoneNumber')?.value ?? '');
    formData.append('email', this.documentForm.get('email')?.value ?? '');
    formData.append('documentTitle', this.title);

    // attach fetched file
    formData.append('file', this.fetchedFile);

    this.documentApi.PostDocument(formData)
  }
}
