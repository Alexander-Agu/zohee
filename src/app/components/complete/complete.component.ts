import { Component } from '@angular/core';

@Component({
  selector: 'app-complete',
  standalone: true,
  template: `
  <section class="relative w-full h-[100dvh] bg-slate-50 flex flex-col items-center justify-center p-6 font-sans text-slate-900">
    
    <div class="w-full max-w-[440px] text-center flex flex-col items-center">
      
      <div class="mb-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <div class="flex flex-col gap-2 mb-8">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter">
          Document Signed
        </h2>
        <p class="text-[10px] text-blue-600 font-bold uppercase tracking-[0.3em]">
          Thank you for your submission
        </p>
      </div>

    </div>
  </section>
  `,
  styles: [`
    :host {
      display: block;
      animation: fadeIn 0.8s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `]
})
export class CompleteComponent {
  today = new Date();
}