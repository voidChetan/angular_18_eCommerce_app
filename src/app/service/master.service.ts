import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { APIResposneModel, CartModel, Customer, LoginModel, OrderModel } from '../model/Product';
import { Constant } from '../constant/constant';
@Injectable({
  providedIn: 'root'
})
export class MasterService {


  readonly apiUrl: string =  'https://freeapi.miniprojectideas.com/api/BigBasket/';

  onCartAdded: Subject<boolean> = new Subject<boolean>();
  loggedUserData: Customer = new Customer();
  
  constructor(private http: HttpClient) {
    const isUser =  localStorage.getItem(Constant.LOCAL_KEY);
    if(isUser != null) {
      const parseObj =  JSON.parse(isUser);
      this.loggedUserData =  parseObj;
    }
   }

  getAllProducts(): Observable<APIResposneModel> { 

    return this.http.get<APIResposneModel>(this.apiUrl + "GetAllProducts")
  }

  getAllCategory(): Observable<APIResposneModel> {
    return this.http.get<APIResposneModel>(this.apiUrl + "GetAllCategory")
  }

  getAllProductsByCategoryId(categoryId: number): Observable<APIResposneModel> {
    const url = `${this.apiUrl}GetAllProductsByCategoryId?id=${categoryId}`;
    return this.http.get<APIResposneModel>(url)
  }

  registerNewCustomer(obj: Customer): Observable<APIResposneModel> { 
    debugger;
    const url = `${this.apiUrl}RegisterCustomer`;
    return this.http.post<APIResposneModel>(url,obj)
  }

  addtocart(obj: CartModel): Observable<APIResposneModel> { 
    debugger; 
    const url = `${this.apiUrl}AddToCart`;
    return this.http.post<APIResposneModel>(url,obj)
  }

  onLogin(obj: LoginModel): Observable<APIResposneModel> { 
    debugger;
    const url = `${this.apiUrl}Login`;
    return this.http.post<APIResposneModel>(url,obj)
  }


  getCartProductsByCustomerId(loggedUserId: number): Observable<APIResposneModel> {
    const url = `${this.apiUrl}GetCartProductsByCustomerId?id=${loggedUserId}`;
    return this.http.get<APIResposneModel>(url)
  }

  deleteProductFromCartById(cartId: number): Observable<APIResposneModel> {
    const url = `${this.apiUrl}DeleteProductFromCartById?id=${cartId}`;
    return this.http.get<APIResposneModel>(url)
  }

  onPlaceOrder(obj: OrderModel): Observable<APIResposneModel> { 
    debugger; 
    const url = `${this.apiUrl}PlaceOrder`;
    return this.http.post<APIResposneModel>(url,obj)
  }
  
}
