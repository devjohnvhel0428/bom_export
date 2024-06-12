import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ProductService } from './Product.service'
import { Util } from '../../util.service'

@Component({
  selector: 'product-detail',
  templateUrl: 'Detail.component.html'
})
export class ProductDetail {
  
  product?: any = {}
  constructor(private route: ActivatedRoute, private ProductService: ProductService, public util: Util) { }
  
  ngOnInit() {
    this.get().add(() => {
      setTimeout(() => { this.util.initView(true) })
    })
  }

  get() {
    return this.ProductService.get(this.route.snapshot.params['id']).subscribe(data => {
      this.product = data.product
    })
  }
}