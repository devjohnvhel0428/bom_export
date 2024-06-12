import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ProductService } from './Product.service'
import { Util } from '../../util.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'product-create',
  templateUrl: 'Create.component.html'
})
export class ProductCreate {
  
  product?: any = {}
  brands?: any[]
  errors?: any = {}
  constructor(private router: Router, private route: ActivatedRoute, private toastr: ToastrService, private ProductService: ProductService, public util: Util) { }
  
  ngOnInit() {
  }

  create() {
    let data = { ...this.product }
    // data.image = (document.getElementsByName('image')[0] as any).files[0]
    data = this.util.getFormData(data)
    this.ProductService.create(data).subscribe(() => {
      this.util.goBack('/product')
    }, (e) => {
      if (e.error.errors) {
        this.errors = e.error.errors
      }
      else {
        this.toastr.success(e.error.message);
      } 
    })
  }
}