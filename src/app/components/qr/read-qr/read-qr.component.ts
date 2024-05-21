// src/app/components/qr/read-qr/read-qr.component.ts
import { Component, OnInit } from '@angular/core';
import { ServicioCdaService } from '../../../service/servicio-cda.service';
import { QR } from '../../../model/qr.model';

@Component({
  selector: 'app-read-qr',
  templateUrl: './read-qr.component.html',
  styleUrls: ['./read-qr.component.css']
})
export class ReadQrComponent implements OnInit {
  qrs: QR[] = [];

  constructor(private servicioCda: ServicioCdaService) {}

  ngOnInit(): void {
    this.obtenerQrs();
  }

  obtenerQrs(): void {
    this.servicioCda.getAllQRs().subscribe((response: QR[]) => {
      this.qrs = response;
    });
  }
}
