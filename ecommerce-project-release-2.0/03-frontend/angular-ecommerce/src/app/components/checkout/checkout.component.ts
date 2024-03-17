import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShopFormService } from '../../services/shop-form.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  
  checkoutFormGroup!: FormGroup

  totalPrice: number = 0
  totalQuantity: number = 0

  creditCardYears: number[] = []
  creditCardMonths: number[] = []

  countries: Country[] = []
  
  shippingAddressStates: State[] = []
  billingAddressStates: State[] = []

  constructor(private formBuilder: FormBuilder,
              private shopService: ShopFormService) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    })

    // Lấy credit card months hiện tại
    const startMonth: number = new Date().getMonth() + 1

    this.shopService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data
      }
    )
    
    // Lấy credit card years hiện tại
    this.shopService.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears = data
      }
    )

    // Lấy countries
    this.shopService.getCountries().subscribe(
      data => {
        this.countries = data
      }
    )
  }

  onSubmit(){
    
  }

  copyShippingAddressToBillingAddress(event: any){

    if(event.target.checked){
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value)
      
      // copy state từ shippingAddress cho billingAddress
      this.billingAddressStates = this.shippingAddressStates

    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset()

      // clear billingAddressStates
      this.billingAddressStates = []
    }

  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard')

    const currentYear: number = new Date().getFullYear()
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear)

    // check current year trùng với year được user chọn thì chỉ lấy từ tháng hiện tại trở đi
    let startMonth: number

    if(currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1
    } else {
      startMonth = 1
    }

    this.shopService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data
      }
    )
  }

  getStates(formGroupName: string) {
    // check để lấy country đúng với form group đang click
    const formGroup = this.checkoutFormGroup.get(formGroupName)

    const countryCode = formGroup?.value.country.code

    this.shopService.getStates(countryCode).subscribe(
      data => {
        if(formGroupName === 'shippingAddress'){
          this.shippingAddressStates = data
        } else {
          this.billingAddressStates = data
        }

        // chọn state đầu tiên là default
        formGroup?.get('state')?.setValue(data[0])
      }
    )
  }
}
