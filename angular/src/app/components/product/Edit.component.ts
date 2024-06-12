import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ProductService } from './Product.service'
import { Util } from '../../util.service'

@Component({
  selector: 'product-edit',
  templateUrl: 'Edit.component.html'
})
export class ProductEdit {
  
  product?: any = {}
  errors?: any = {}
  constructor(private router: Router, private route: ActivatedRoute, private ProductService: ProductService, public util: Util) { }
  
  ngOnInit() {
    this.get().add(() => {
      setTimeout(() => { this.util.initView(true) })
    })
  }

  get() {
    return this.ProductService.edit(this.route.snapshot.params['id']).subscribe(data => {
      this.product = data.product
    })
  }

  edit() {
    let data = { ...this.product }
    data.image = (document.getElementsByName('image')[0] as any).files[0]
    data = this.util.getFormData(data)
    this.ProductService.edit(this.route.snapshot.params['id'], data).subscribe(() => {
      this.util.goBack('/product')
    }, (e) => {
      if (e.error.errors) {
        this.errors = e.error.errors
      }
      else {
        alert(e.error.message)
      } 
    })
  }
}