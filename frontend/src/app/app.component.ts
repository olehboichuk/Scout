import { Component } from '@angular/core';
import {PrintService} from "./print.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  constructor(public printService: PrintService) { }

  onPrintInvoice() {
    const invoiceIds = ['101', '102'];
    this.printService
      .printDocument('player', invoiceIds);
  }
}
