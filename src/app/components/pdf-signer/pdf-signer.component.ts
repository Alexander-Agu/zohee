import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NgxExtendedPdfViewerModule,
  NgxExtendedPdfViewerComponent,
  NgxExtendedPdfViewerService
} from 'ngx-extended-pdf-viewer';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { DocumentApiService } from '../../services/documents/document-api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pdf-signer',
  standalone: true,
  imports: [NgxExtendedPdfViewerModule, CdkDrag, RouterLink],
  templateUrl: "./pdf.signer.component.html",
  styleUrl: './pdf-signer.component.css'
})
export class PdfSignerComponent implements OnInit {

  @ViewChild('pdfViewer')
  pdfViewer!: NgxExtendedPdfViewerComponent;

  title = "";
  documentId = 0;
  userEmail = "";
  userId = 0;
  pdfSrc = "";
  isPdfReady = false;

  viewHome = false;
  
  // UI State
  showPopup = false;

  constructor(
    private documentApi: DocumentApiService,
    private route: ActivatedRoute,
    private router: Router,
    private pdfViewerService: NgxExtendedPdfViewerService
  ) {}

  ngOnInit(): void {
    this.title = this.route.snapshot.paramMap.get('name') ?? '';
    this.documentId = Number(this.route.snapshot.paramMap.get('documentId') ?? 0);
    this.userEmail = this.route.snapshot.paramMap.get('email') ?? '';
    this.userId = Number(this.route.snapshot.paramMap.get('userId') ?? 0);

    this.documentApi.getDocumentPdf(this.title)
      .subscribe((blob: Blob) => {
        this.pdfSrc = URL.createObjectURL(blob);
      });

    // if a user is found the cannot navigate to dashboard
    if (this.userId === 0) this.viewHome = false;
    else this.viewHome = true;
  }


  onPdfLoaded() {
    this.isPdfReady = true;
  }

  async onSubmit() {
    try {
      const formData = new FormData();
      const blob = await this.pdfViewerService.getCurrentDocumentAsBlob();

      if (!blob) {
        throw new Error('Failed to retrieve document');
      }

      formData.append('file', blob, 'signed.pdf');

      await this.documentApi.SignDocument(
        formData,
        this.title,
        this.documentId,
        this.userId,
        this.userEmail,
      );
      
      this.showPopup = false;
      this.router.navigate(['/documents']); // Success redirect

    } catch (err) {
      console.error(err);
      this.showPopup = false;
    }
  }
}