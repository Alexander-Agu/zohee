import { Routes } from '@angular/router';
import { PortalComponent } from './components/portal/portal.component';
import { PdfSignerComponent } from './components/pdf-signer/pdf-signer.component';
import { SendSignatureComponent } from './components/send-signature/send-signature.component';

export const routes: Routes = [
    {
        path: "",
        component: PortalComponent
    },
    {
        path: "pdf-signer/:name",
        component: PdfSignerComponent
    },
    {
        path: "send-signature",
        component: SendSignatureComponent
    }
];
