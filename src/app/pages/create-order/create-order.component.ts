import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { APIResposneModel, CartData, OrderModel } from '../../model/Product';
import { FormsModule } from '@angular/forms';
import { ProductCode, productStatus } from '../../constant/constant';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css'
})
export class CreateOrderComponent implements OnInit {

  masterService =  inject(MasterService);
  cartData: CartData [] = [];
  totalAmount: number = 0;
  orderObj: OrderModel = new OrderModel(); 

  ngOnInit(): void {
    this.getCartItems(); 
    // if(this.orderObj.SaleId == productStatus.active) {

    // } else if (this.orderObj.SaleId == productStatus.deActive) {

    // }
    // if(this.orderObj.SaleId = ProductCode.active) {

    // } else if (this.orderObj.SaleId = ProductCode.deActive)
  }

 getCartItems(): void {
    this.masterService.getCartProductsByCustomerId( this.masterService.loggedUserData.custId).subscribe((res:APIResposneModel)=>{
      this.cartData =  res.data;
      this.cartData.forEach(element => {
        this.totalAmount =  this.totalAmount + element.productPrice;
      });
    })
  }

  getSumOfTwoNo(num1: number, num2: number): number {
    return num1 +  num2;
  }

  placeOrder() {
    debugger;
    this.orderObj.CustId = this.masterService.loggedUserData.custId;
    this.orderObj.TotalInvoiceAmount = this.totalAmount;
    this.masterService.onPlaceOrder(this.orderObj).subscribe((res:APIResposneModel)=>{
      if(res.result)  {
        alert("Order Place Succefully");
        this.getCartItems();
        this.orderObj = new OrderModel();
      } else {
        alert(res.message);
      }
    })
  }

}
