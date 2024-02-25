import { Component } from '@angular/core';
import { SalesPerson } from './sales-person';

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list.component.html',
  styleUrl: './sales-person-list.component.css'
})
export class SalesPersonListComponent {
  // array objects data mock
  salesPersonList: SalesPerson[] =  [ 
    new SalesPerson("test1", "testLastName1", "email1", 1000),
    new SalesPerson("test2", "testLastName2", "email2", 2000),
    new SalesPerson("test3", "testLastName3", "email3", 3000),
    new SalesPerson("test4", "testLastName4", "email4", 4000),
  ];

}
