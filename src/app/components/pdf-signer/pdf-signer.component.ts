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

  title = "";
  pdfSrc = ""

  ngOnInit(): void {
    this.title = this.route.snapshot.paramMap.get('name') ?? '';

    this.documentApi.getDocumentPdf(this.title)
      .subscribe((blob: Blob) => {
        this.pdfSrc = URL.createObjectURL(blob);
    });
  }

  toUpload(){
    this.router.navigate(['upload/', this.title]);
  }
}
