import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  wishlist:any=[]
constructor(private api:ApiService, private toastr:ToastrService){

}
  ngOnInit() {
    this.api.getWishList().subscribe({
      next:(res:any)=>{
        this.wishlist=res
        console.log(this.wishlist);
      
      },
      error:(err:any)=>{
        this.toastr.error(err.error)
      }
    })
  }
  removeFromWishList(id:any){
    this.api.removeFromWishList(id).subscribe({
      next:(res:any)=>{
      
        this.toastr.success("product removed from wishlist")
        this.ngOnInit()
        this.api.getWishListCount()
      },
      error:(err:any)=>{
        this.toastr.error(err.error)
      }
    })
  }
}
