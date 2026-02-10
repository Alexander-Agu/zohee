import { Component } from '@angular/core';
import { PdfSignerComponent } from "./components/pdf-signer/pdf-signer.component";
import { PortalComponent } from "./components/portal/portal.component";
import { SendSignatureComponent } from "./components/send-signature/send-signature.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { UploadComponent } from "./components/upload/upload.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    PdfSignerComponent,
    PortalComponent,
    SendSignatureComponent,
    RouterOutlet,
    RouterLink,
    UploadComponent
],
  template: `
    <app-upload />
  `
})
export class AppComponent {}

