import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DocumentApiService } from '../../services/documents/document-api.service';
import { TemplateApiService } from '../../services/Template/template-api.service';

@Component({
  selector: 'app-send-signature',
  standalone: true,
  imports: [
    CommonModule,         // Required for *ngFor
    ReactiveFormsModule,  // Required for FormGroups
    PdfViewerModule,
    RouterLink
  ],
  templateUrl: './send.signature.component.html',
  styleUrl: './send-signature.component.css'
})
export class SendSignatureComponent implements OnInit, OnDestroy {
  documentForm!: FormGroup;
  title = '';
  pdfSrc = '';

  // file created from backend blob
  private fetchedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private documentApi: DocumentApiService,
    private templateApi: TemplateApiService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize the form with FormArray for recipients
    this.documentForm = this.fb.group({
      documentTitle: ['', [Validators.required]],
      recipients: this.fb.array([
        this.createRecipientGroup(), // Recipient 1
        this.createRecipientGroup()  // Recipient 2
      ])
    });
  }

  ngOnInit(): void {
    this.title = this.route.snapshot.paramMap.get('name') ?? '';

    this.documentForm.patchValue({
      documentTitle: this.title
    });

    // Your existing logic to fetch the PDF
    this.templateApi.getTemplatePdf(this.title)
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

  // Helper to create a recipient group
  createRecipientGroup(): FormGroup {
    return this.fb.group({
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Phone: ['', Validators.required]
    });
  }

  // Getter for the HTML loop
  get recipients(): FormArray {
    return this.documentForm.get('recipients') as FormArray;
  }

  addRecipient(): void {
    this.recipients.push(this.createRecipientGroup());
  }

  removeRecipient(index: number): void {
    if (this.recipients.length > 1) {
      this.recipients.removeAt(index);
    }
  }

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
    formData.append('documentTitle', this.title);
    
    // send the array of recipients as a JSON string to handle multiple users
    const recipientsArray = this.documentForm.get('recipients')?.value;
    formData.append('recipients', JSON.stringify(recipientsArray));

    formData.append('file', this.fetchedFile);

    this.documentApi.PostDocument(formData);
  }
}