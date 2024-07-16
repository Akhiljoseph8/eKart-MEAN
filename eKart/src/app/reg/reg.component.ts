import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent {
 regForm=this.fb.group({
  username:['',[Validators.required,Validators.minLength(3)]],
  password:['',[Validators.required,Validators.minLength(3)]],
  email:['',[Validators.required,Validators.email]]
 })
 constructor(private fb:FormBuilder,private api:ApiService,private toastr:ToastrService,private router:Router){

 }
 handleSubmit(){
  console.log(this.regForm.value)
  this.api.regUser(this.regForm.value).subscribe({
    next:(res:any)=>{
      this.toastr.success("Registration success")
      this.regForm.reset()
      this.api.getWishListCount()
      this.router.navigateByUrl('log')
    },
    error:(err:any)=>{
      this.toastr.error(err.error)
    }
  })
 }
}
