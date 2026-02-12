import { Component, OnInit } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {CdkDrag} from '@angular/cdk/drag-drop';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { DocumentApiService } from '../../services/documents/document-api.service';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-pdf-signer',
  standalone: true,
  imports: [PdfViewerModule, CdkDrag, NgxExtendedPdfViewerModule, RouterLink],
  templateUrl: "pdf.signer.component.html",
  styleUrl: './pdf-signer.component.css'
})
export class PdfSignerComponent implements OnInit {
  constructor(
    private documentApi: DocumentApiService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  viewHome = false;

  title = "";
  documentId = 0;
  userEmail = "";
  userId = 0;
  pdfSrc = ""

  ngOnInit(): void {
    this.title = this.route.snapshot.paramMap.get('name') ?? '';
    const documentIdNum = this.route.snapshot.paramMap.get('documentId') ?? '';
    this.documentId = Number(documentIdNum);
    this.userEmail = this.route.snapshot.paramMap.get('email') ?? '';
    const id = this.route.snapshot.paramMap.get('userId') ?? '';
    this.userId = Number(id)

    // if a user is found the cannot navigate to dashboard
    if (id === "") this.viewHome = false;
    else this.viewHome = true;

    this.documentApi.getDocumentPdf(this.title)
      .subscribe((blob: Blob) => {
        this.pdfSrc = URL.createObjectURL(blob);
    });
  }

toUpload() {
    if (this.title && this.documentId && this.userEmail) {
      // Use this.documentId instead of this.documentApi
      this.router.navigate(['upload', this.userEmail, this.documentId, this.userId, this.title]);
    }
  }
}
