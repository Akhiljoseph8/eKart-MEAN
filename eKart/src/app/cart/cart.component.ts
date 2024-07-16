import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems:any=[]
  cartTotal:any=0
  couponStatus:boolean=false
  couponUseStatus:boolean=false
  constructor(private api:ApiService,private toastr:ToastrService,private router:Router){}
  ngOnInit(): void {
    this.api.getCartItemsApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.cartItems=res
        this.getCartTotal()
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
removeCart(id:any){
  this.api.removeCartItem(id).subscribe({
    next:(res:any)=>{
    
      this.api.getCartCount()
      this.toastr.success("product removed from Cart")
      this.ngOnInit()
    },
    error:(err:any)=>{

      this.toastr.error(err.error)
    }
  })
}
increment(id:any){
  this.api.incrementQuantity(id).subscribe({
    next:(res:any)=>{
      this.ngOnInit()
    }, error:(err:any)=>{
      console.log(err)
    }
  })
}

decrement(id:any){
  this.api.decrementQuantity(id).subscribe({
    next:(res:any)=>{
      this.ngOnInit()
      this.api.getCartCount()
    }, error:(err:any)=>{
      console.log(err)
    }
  })
}
emptyCart(){
  this.api.emptyCart().subscribe({
    next:(res:any)=>{
      this.ngOnInit()
      this.api.getCartCount()
    }, error:(err:any)=>{
      console.log(err)
    }
  })
}
getCartTotal(){
  this.cartTotal=Math.ceil(this.cartItems.map((item:any)=>item.totalPrice).reduce((p1:any,p2:any)=>p1+p2))
}
changeCouponStatus(){
  this.couponStatus=true
}

discount5(){
  this.couponUseStatus=true
  const discount=Math.ceil(this.cartTotal*0.05)
  this.cartTotal-=discount
}

discount20(){
  this.couponUseStatus=true
  const discount=Math.ceil(this.cartTotal*0.2)
  this.cartTotal-=discount
}

discount50(){
  this.couponUseStatus=true
  const discount=Math.ceil(this.cartTotal*0.5)
  this.cartTotal-=discount
}
checkout(){
  sessionStorage.setItem('checkoutAmount',this.cartTotal)
  this.router.navigateByUrl('check')
 }

}




