import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
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

  constructor(private documentApi: DocumentApiService) {}

  ngOnInit(): void {
    this.documentApi.getAllDocument().subscribe((docs) => {
      this.documents = docs;
    });
  }

  // Getter to handle filtering in the template
  get filteredDocuments() {
    if (this.filterStatus === 'signed') return this.documents.filter(d => d.isSigned);
    if (this.filterStatus === 'not-signed') return this.documents.filter(d => !d.isSigned);
    return this.documents;
  }

  setFilter(status: 'all' | 'signed' | 'not-signed') {
    this.filterStatus = status;
  }
}