import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../model/user.model';
import { ServicioCdaService } from '../../../service/servicio-cda.service';

@Component({
  selector: 'app-read-user',
  templateUrl: './read-user.component.html',
  styleUrl: './read-user.component.css'
})
export class ReadUserComponent implements OnInit{
  listUsers: UserModel [] = [];

  constructor(private servicio: ServicioCdaService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.servicio.leerUsuarios().subscribe((data:any) => {
          this.listUsers = data;

    })
  }

  onChangeFiltroPremium() {
    this.listar();
  }
}
