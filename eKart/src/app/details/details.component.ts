import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {


  pid:any=""
  product:any={}
  constructor(private ar:ActivatedRoute,private api:ApiService){
    this.ar.params.subscribe((res:any)=>{
      this.pid=res.id
    })
  }

  ngOnInit(): void {
      this.api.getProduct(this.pid).subscribe({
        next:(res:any)=>{
        console.log(res)
        this.product=res
        },error:(err:any)=>{
          console.log(err)
        }
      })
  }
}
