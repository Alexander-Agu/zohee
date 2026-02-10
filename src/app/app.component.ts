import { Component } from '@angular/core';
import { PdfSignerComponent } from "./components/pdf-signer/pdf-signer.component";
import { PortalComponent } from "./components/portal/portal.component";
import { SendSignatureComponent } from "./components/send-signature/send-signature.component";
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    PdfSignerComponent, 
    PortalComponent, 
    SendSignatureComponent,
    RouterOutlet,
    RouterLink
  ],
  template: `
    <router-outlet />
  `
})
export class AppComponent {}

