import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  constructor() { }

  getCreditCardMonths(startMonth: number): Observable<number[]> {

    let data: number[] = []

    // build array cho Month dropdown list
    // bắt đầu từ tháng hiện tại rồi loop qua
    for(let theMonth = startMonth; theMonth <= 12; theMonth ++){
      data.push(theMonth)
    }

    return of(data)
  }

  getCreditCardYears(): Observable<number[]> {
    let data: number[] = []

    // build array years dropdown list
    // bắt đầu với năm hiện tại rồi loop qua 10 năm sau
    const startYear: number = new Date().getFullYear() // lấy năm hiện tại
    const endYear: number = startYear + 10

    for(let theYear = startYear; theYear <= endYear; theYear++){
      data.push(theYear)
    }

    return of(data)
  }
}
