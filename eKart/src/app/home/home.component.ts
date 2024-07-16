import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   constructor(private api:ApiService, private toastr:ToastrService){}
productData:any=[]
key:any=""
   ngOnInit(): void {
       this.api.getAllProducts().subscribe({
        next:(res:any)=>{
          this.productData=res
          this.api.searchKeyBS.subscribe((res:any)=>{
            this.key=res
          })
          console.log(this.productData)
          // this.key=res
        },
        error:(err:any)=>{
          console.log(err)
        }
       })
   }
   addWishList(data:any){
    this.api.addToWishList(data).subscribe({
      next:(res:any)=>{
        this.toastr.success("Added to Wishlist")
      },
      error:(err:any)=>{
        this.toastr.error(err.error)
      }
    })
  }
 addCart(product:any){
  const {id,title,image,price}=product
  const quantity=1
  if(sessionStorage.getItem('token')){
    this.api.addToCartApi({id,title,image,price,quantity}).subscribe({
      next:(res:any)=>{
        this.toastr.success(res)
      },
      error:(err:any)=>{
        console.log(err)
        this.toastr.error("Add to cart failed")
      }
    })
  }else{
    this.toastr.error("login first")
  }
 }

}
