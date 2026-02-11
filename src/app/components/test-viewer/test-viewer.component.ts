import { Component } from '@angular/core';
import { CdkDrag, CdkDragEnd } from "@angular/cdk/drag-drop"; // Import CdkDragEnd
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-test-viewer',
  standalone: true,
  imports: [CdkDrag, PdfViewerModule],
  templateUrl: "./test.viewer.component.html",
  styleUrl: './test-viewer.component.css'
})
export class TestViewerComponent {
  pdfSrc = "assets/test.pdf";

  // Initialize with default values so the template doesn't error out
  xCoord = 100;
  yCoord = 100;

  // This function captures the final position after the drag stops
  onDragEnded(event: CdkDragEnd) {
    const transform = event.source.getFreeDragPosition();
    // Update our coords so the [style] bindings stay in sync
    this.xCoord += transform.x;
    this.yCoord += transform.y;
    
    // Reset the internal CDK transform so it doesn't "double up" the offset
    event.source.reset();
  }
}