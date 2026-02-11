import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Important for @if and @for
import { DocumentApiService } from '../../services/documents/document-api.service';

@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: "./portal.component.html",
  styleUrl: './portal.component.css'
})
export class PortalComponent implements OnInit {
  documents: any[] = [];
  filterStatus: 'all' | 'signed' | 'not-signed' = 'all';
  viewMode: 'documents' | 'templates' = 'documents';

  constructor(private documentApi: DocumentApiService, private router: Router) {}

  ngOnInit(): void {
    this.documentApi.getAllDocument().subscribe((docs) => {
      this.documents = docs;
    });
  }

  viewDocument(name: string){
    this.router.navigate(["pdf-signer", name]);
  }

  toTemplate(){[
    this.router.navigate(["template"])
  ]}

// Filtered list for documents only
  get filteredDocuments() {
    const docs = this.documents.filter(d => !d.isTemplate); // Future logic
    if (this.filterStatus === 'signed') return docs.filter(d => d.isSigned);
    if (this.filterStatus === 'not-signed') return docs.filter(d => !d.isSigned);
    return docs;
  }

  // Simulated list for templates
  get onlyTemplates() {
    return this.documents.filter(x => x.isTemplate);
  }

  setView(mode: 'documents' | 'templates') {
    this.viewMode = mode;
  }

  setFilter(status: 'all' | 'signed' | 'not-signed') {
    this.filterStatus = status;
  }
}