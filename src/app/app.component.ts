import { Component,ElementRef,inject,OnInit,ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { APIResposneModel, CartData, Customer, LoginModel } from './model/Product';
import { FormsModule } from '@angular/forms';
import { MasterService } from './service/master.service';
import { Constant } from './constant/constant';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular_18_eCommerce_app';

  registerObj: Customer = new Customer();
  loginObj: LoginModel = new LoginModel();

  loggedUserData: Customer = new Customer();
  masterServioce = inject(MasterService);


  @ViewChild("registerModel") registerModel: ElementRef  | undefined;
  @ViewChild("loginModel") loginModel: ElementRef  | undefined;
  isCartPopupOpen: boolean = false;
  cartData: CartData [] = []

  ngOnInit(): void {
    const isUser =  localStorage.getItem(Constant.LOCAL_KEY);
    if(isUser != null) {
      const parseObj =  JSON.parse(isUser);
      this.loggedUserData =  parseObj;
      this.getCartItems();
    }
    this.masterServioce.onCartAdded.subscribe((res:boolean)=>{
      if(res) {
        this.getCartItems();
      }
    })
  }
  onRemovePrduct(cartId: number) {
    debugger;
    this.masterServioce.deleteProductFromCartById(cartId).subscribe((res:APIResposneModel)=>{
      if(res.result) {
        alert("Product Removed From cart");
        this.getCartItems();
      } else {
        alert(res.message)
      }
    })
  }

  getCartItems() {
    this.masterServioce.getCartProductsByCustomerId( this.loggedUserData.custId).subscribe((res:APIResposneModel)=>{
      this.cartData =  res.data;
    })
  }

  showCartPopup() {
    this.isCartPopupOpen = !this.isCartPopupOpen;
  }

  logoff() {
    localStorage.removeItem(Constant.LOCAL_KEY);
    this.loggedUserData = new Customer();
  }
  openRegisterModel() {
    if(this.registerModel) {
     this.registerModel.nativeElement.style.display = "block"
    }
  }
  closeRegisterModel() {
    if(this.registerModel) {
     this.registerModel.nativeElement.style.display = "none"
    }
  }

  openLoginModel() {
    if(this.loginModel) {
     this.loginModel.nativeElement.style.display = "block"
    }
  }
  closeLoginrModel() {
    if(this.loginModel) {
     this.loginModel.nativeElement.style.display = "none"
    }
  }
  onRegister() {
    debugger;
    this.masterServioce.registerNewCustomer(this.registerObj).subscribe((res:APIResposneModel)=>{
      if(res.result) {
        alert("Registration Success");
        this.closeRegisterModel();
      } else {
        alert(res.message)
      }
     })
  }
  onLogin() {
    debugger;
    this.masterServioce.onLogin(this.loginObj).subscribe((res:APIResposneModel)=>{
      if(res.result) {
        this.loggedUserData = res.data;
        localStorage.setItem(Constant.LOCAL_KEY,JSON.stringify(res.data))
        this.closeLoginrModel();
      } else {
        alert(res.message)
      }
     })
  }

  
}
