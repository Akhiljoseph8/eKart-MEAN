import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  payPalConfig ? : IPayPalConfig;
   checkoutStatus:boolean=false
   totalAmount:String=""
   checkForm=this.fb.group({
    username:['',[Validators.required,Validators.minLength(3)]],
    address:['',[Validators.required,Validators.minLength(3)]],
    phone:['',[Validators.required,Validators.pattern('[0-9]*')]]
   })
   constructor(private fb:FormBuilder,private toastr:ToastrService, private router:Router, private api:ApiService){}

   proceedtoBuy(){
    if(this.checkForm.valid){
      this.checkoutStatus=true
      this.totalAmount=sessionStorage.getItem('checkoutAmount') || ""
      this.initConfig();
    }else{
      this.toastr.info("Invalid Inputs")
    }
   }

   ngOnInit(): void {
   
}

private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: this.totalAmount,
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: this.totalAmount
                        }
                    }
                },
                
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any )=> {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
             this.api.emptyCart().subscribe((res:any)=>{
              this.toastr.success("Transaction Completed")
              this.checkForm.reset()
              this.api.getCartCount()
              this.checkoutStatus=false
              sessionStorage.removeItem('checkoutAmount')
              this.router.navigateByUrl('/')

             })
           
            
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            // this.showCancel = true;
            this.toastr.info("Transaction Cancelled")

        },
        onError: err => {
            console.log('OnError', err);
            // this.showError = true;
            this.toastr.warning("SOMETHING WENT WRONG")
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            // this.resetStatus();
        }
    };
}


}
