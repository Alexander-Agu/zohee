import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TemplateApiService {

  constructor(private http: HttpClient, private router: Router) { }

    PostTemplate(formData: FormData){

    this.http.post('https://localhost:7291/api/Template/create-template', formData).subscribe({
      next: (res) => {
        console.log('Upload Success:', res);
        alert('Template sent successfully!');
        
        const title = formData.get("templateTitle");

        const filename = `${title}.pdf`;
        
        this.router.navigate(['send-signature', filename]);
      },
      error: (err) => {
        console.error('Upload Error:', err);
      }
    });
  }

  getTemplatePdf(filename: string) {
    return this.http.get(
      `https://localhost:7291/api/template/file/${filename}`,
      { responseType: 'blob' }
    );
  }

  getAllTemplates() {
    return this.http.get<Template[]>(`https://localhost:7291/api/template/`);
  }
}


export interface Template {
  templateId: number;
  templateTitle: string;
  fileName: string;
}

