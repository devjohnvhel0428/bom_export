import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { OrderDetailService } from './OrderDetail.service'
import { Util } from '../../util.service'

@Component({
  selector: 'orderDetail-edit',
  templateUrl: 'Edit.component.html'
})
export class OrderDetailEdit {
  
  orderDetail?: any = {}
  accessories?: any[]
  errors?: any = {}
  constructor(private router: Router, private route: ActivatedRoute, private OrderDetailService: OrderDetailService, public util: Util) { }
  
  ngOnInit() {
    this.get().add(() => {
      setTimeout(() => { this.util.initView(true) })
    })
  }

  get() {
    return this.OrderDetailService.edit(this.route.snapshot.params['id']).subscribe(data => {
      this.orderDetail = data.orderDetail
      this.accessories = data.accessories
    })
  }

  edit() {
    this.OrderDetailService.edit(this.route.snapshot.params['id'], this.orderDetail).subscribe(() => {
      this.util.goBack('/bomDetail')
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