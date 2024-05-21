// src/app/components/user/read-user/read-user.component.ts
import { Component, OnInit } from '@angular/core';
import { ServicioCdaService } from "../../../service/servicio-cda.service";
import { Usuario } from "../../../model/user.model";

@Component({
  selector: 'app-read-user',
  templateUrl: './read-user.component.html',
  styleUrls: ['./read-user.component.css']
})
export class ReadUserComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private servicioCda: ServicioCdaService) {}

  ngOnInit(): void {
    this.servicioCda.getAllUsuarios().subscribe(response => {
      this.usuarios = response;
    });
  }
}
