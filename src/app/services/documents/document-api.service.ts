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
        const number = formData.get("phoneNumber");
        const title = formData.get("documentTitle");

        const filename = `${name}_${number}_${title}.pdf`;
        
        this.router.navigate(['pdf-signer', filename]);
      },
      error: (err) => {
        console.error('Upload Error:', err);
      }
    });
  }

getDocumentPdf(filename: string) {
    return this.http.get(
      `https://localhost:7291/api/documents/file/${filename}`,
      { responseType: 'blob' } // PDF = blob, NOT string
    );
  }

}
