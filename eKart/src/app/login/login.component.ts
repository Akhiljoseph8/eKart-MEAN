import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
constructor (private fb:FormBuilder,private toastr:ToastrService,private router:Router,private api:ApiService){}
  logForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(3)]]
  })

  handleSubmit(){
    console.log(this.logForm.value)
    this.api.login(this.logForm.value).subscribe({
      next:(res:any)=>{
        console.log(res)
        sessionStorage.setItem('user',JSON.stringify(res.existinguser))
        sessionStorage.setItem('token',res.token)
        this.toastr.success("Login success")
        this.api.getWishListCount()
        this.router.navigateByUrl('')
      },
      error:(err:any)=>{
        this.toastr.error(err.error)
      }
    })
   }

}
