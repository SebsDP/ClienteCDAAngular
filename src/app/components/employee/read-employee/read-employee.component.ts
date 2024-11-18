import { Component, OnInit } from '@angular/core';
import { ServicioCdaService } from '../../../service/servicio-cda.service';
import { Employee } from '../../../model/employee.model';

@Component({
  selector: 'app-read-employee',
  templateUrl: './read-employee.component.html',
  styleUrls: ['./read-employee.component.css']
})
export class ReadEmployeeComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private servicioCda: ServicioCdaService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.servicioCda.getAllEmployees().subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        alert('Error al cargar empleados');
      }
    );
  }
}
