import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: any[], key: any): any {
    if(products.length==0) return []
    if(key=="") return products
    key=key.toLowerCase()
    products=products.filter((item)=>item.title.trim().toLowerCase().includes(key.trim()))
    return products;
  }

}
