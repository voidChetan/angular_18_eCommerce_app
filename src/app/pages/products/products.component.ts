import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { APIResposneModel, CartModel, Category, Customer, ProductList } from '../../model/Product';
import { map, Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Constant } from '../../constant/constant';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy {


 // productList: ProductList [] = [];

  productList = signal<ProductList []>([]);

  categeoryList$: Observable<Category[]> = new Observable<Category[]>();

  subscriptionList: Subscription[]= [];


  masterService =  inject(MasterService);

  
  
  constructor() {
      
  }

  ngOnInit(): void {
    this.loadAllProducts();
    this.categeoryList$ =  this.masterService.getAllCategory().pipe(
      map(item=> item.data)
    )
  }

  getProductByCategory(id: number) {
    this.masterService.getAllProductsByCategoryId(id).subscribe((res:APIResposneModel)=>{
      this.productList.set(res.data);
    })
  } 

  loadAllProducts() {
    this.subscriptionList.push(this.masterService.getAllProducts().subscribe((res:APIResposneModel)=>{
      this.productList.set(res.data);
    }))
  }

  onAddtoCart(id: number) {
    debugger;
    const newObj : CartModel = new CartModel();
    newObj.ProductId = id;
    newObj.CustId =  this.masterService.loggedUserData.custId;
    this.masterService.addtocart(newObj).subscribe((res:APIResposneModel)=>{
      if(res.result) {
        alert("Product Added to Cart");
        this.masterService.onCartAdded.next(true);
      } else {
        alert(res.message)
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach(element => {
      element.unsubscribe();
    });
  }

}
