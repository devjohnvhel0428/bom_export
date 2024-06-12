import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { OrderDetailService } from './OrderDetail.service'
import { Util } from '../../util.service'

@Component({
  selector: 'orderDetail-delete',
  templateUrl: 'Delete.component.html'
})
export class OrderDetailDelete {
  
  orderDetail?: any = {}
  constructor(private router: Router, private route: ActivatedRoute, private OrderDetailService: OrderDetailService, public util: Util) { }
  
  ngOnInit() {
    this.get().add(() => {
      setTimeout(() => { this.util.initView(true) })
    })
  }

  get() {
    return this.OrderDetailService.delete(this.route.snapshot.params['id']).subscribe(data => {
      this.orderDetail = data.orderDetail
    })
  }

  delete() {
    this.OrderDetailService.delete(this.route.snapshot.params['id'], this.orderDetail).subscribe(() => {
      this.util.goBack('/bomDetail')
    }, (e) => {
      alert(e.error.message)
    })
  }
}