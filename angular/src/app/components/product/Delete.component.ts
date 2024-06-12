import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ProductService } from './Product.service'
import { Util } from '../../util.service'

@Component({
  selector: 'product-delete',
  templateUrl: 'Delete.component.html'
})
export class ProductDelete {
  
  product?: any = {}
  constructor(private router: Router, private route: ActivatedRoute, private ProductService: ProductService, public util: Util) { }
  
  ngOnInit() {
    this.get().add(() => {
      setTimeout(() => { this.util.initView(true) })
    })
  }

  get() {
    return this.ProductService.delete(this.route.snapshot.params['id']).subscribe(data => {
      this.product = data.product
    })
  }

  delete() {
    this.ProductService.delete(this.route.snapshot.params['id'], this.product).subscribe(() => {
      this.util.goBack('/product')
    }, (e) => {
      alert(e.error.message)
    })
  }
}