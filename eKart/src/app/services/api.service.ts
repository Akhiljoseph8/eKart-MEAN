import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  base_url :string="http://localhost:3000"
  wishListCountBS=new BehaviorSubject(0)
  cartCountBS=new BehaviorSubject(0)
  searchKeyBS=new BehaviorSubject("")
  constructor(private http:HttpClient) {
    if (sessionStorage.getItem('token')) {
      this.getWishListCount()
      this.getCartCount()
    }
   }

  getAllProducts(){
    return this.http.get(`${this.base_url}/all-products`)
  }
  getProduct(id:any){
    return this.http.get(`${this.base_url}/get-product/${id}`)
  }
  regUser(data:any){
    return this.http.post(`${this.base_url}/register`,data)
  }
  login(data:any){
    return this.http.post(`${this.base_url}/login`,data)
  }

  appendTokenToHeader(){
    const token = sessionStorage.getItem('token')
    let headers = new HttpHeaders()
    if (token) {
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }
  addToWishList(data:any){
    return this.http.post(`${this.base_url}/addwish`,data,this.appendTokenToHeader())
  }
  
  getWishList(){
    return this.http.get(`${this.base_url}/getwish`,this.appendTokenToHeader())
  }

  removeFromWishList(id:any){
    return this.http.delete(`${this.base_url}/remwish/${id}`,this.appendTokenToHeader())
  }

  getWishListCount(){
    this.getWishList().subscribe((res:any)=>{
      this.wishListCountBS.next(res.length)
    })
  }
  
  addToCartApi(data:any){
    return this.http.post(`${this.base_url}/addcart`,data,this.appendTokenToHeader())
  }

  getCartItemsApi(){
    return this.http.get(`${this.base_url}/getcart`,this.appendTokenToHeader())
  }

  getCartCount(){
    this.getCartItemsApi().subscribe((res:any)=>{
      this.cartCountBS.next(res.length)
    })
  }
  removeCartItem(id:any){
    return this.http.delete(`${this.base_url}/remcart/${id}`,this.appendTokenToHeader())
  }
  incrementQuantity(id:any){
    return this.http.get(`${this.base_url}/cartinc/${id}`,this.appendTokenToHeader())
  }
  decrementQuantity(id:any){
    return this.http.get(`${this.base_url}/cartdec/${id}`,this.appendTokenToHeader())
  }
  emptyCart(){
    return this.http.delete(`${this.base_url}/emptycart`,this.appendTokenToHeader())
  }
  isLoggedIn(){
    return !!sessionStorage.getItem('token')
  }
}

