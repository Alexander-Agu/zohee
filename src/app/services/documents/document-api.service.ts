import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DocumentApiService {

  constructor(private http: HttpClient, private router: Router) { }

  PostDocument(formData: FormData){

    this.http.post('https://localhost:7291/api/documents/upload', formData).subscribe({
      next: (res) => {
        console.log('Upload Success:', res);
        alert('Document sent successfully!');
        
        const name = formData.get("userName");
        const email = formData.get("email");
        const title = formData.get("documentTitle");

        const filename = `${res}.pdf`;
        
        // this.router.navigate(['pdf-signer', filename]);
      },
      error: (err) => {
        console.error('Upload Error:', err);
      }
    });
  }

  SignDocument(formData: FormData, filename: string, id: number, userId: number, email: string){
    this.http.put(`https://localhost:7291/api/documents/sign/${email}/${id}/${userId}/${filename}`, formData).subscribe({
      next: (res) => {
        alert('Document signed successfully!');
        
        this.router.navigate(["complete"]);
      },
      error: (err) => {
        console.error('Upload Error:', err);
      }
    });   
  }

  getDocumentPdf(filename: string) {
    return this.http.get(
      `https://localhost:7291/api/documents/file/${filename}`,
      { responseType: 'blob' }
    );
  }

  getInitialDocumentPdf(filename: string) {
    return this.http.get(
      `https://localhost:7291/api/documents/initial-file/${filename}`,
      { responseType: 'blob' }
    );
  }

  getAllDocument() {
    return this.http.get<Document[]>(`https://localhost:7291/api/documents/`);
  }

}

export interface Document {
  id: number;
  documentTitle: string;
  name: string;
  phone: string;
  fileName: string;
  email: string;
  isSigned: boolean;
  isTemplate: boolean
}
