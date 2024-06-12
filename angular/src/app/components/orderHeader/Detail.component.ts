import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { OrderHeaderService } from './OrderHeader.service'
import { Util } from '../../util.service'

@Component({
  selector: 'orderHeader-detail',
  templateUrl: 'Detail.component.html'
})
export class OrderHeaderDetail {
  
  orderHeader?: any = {}
  orderHeaderOrderDetails?: any[]
  constructor(private route: ActivatedRoute, private OrderHeaderService: OrderHeaderService, public util: Util) { }
  
  ngOnInit() {
    this.get().add(() => {
      setTimeout(() => { this.util.initView(true) })
    })
  }

  get() {
    return this.OrderHeaderService.get(this.route.snapshot.params['id']).subscribe(data => {
      this.orderHeader = data.orderHeader
      this.orderHeaderOrderDetails = data.orderHeaderOrderDetails
    })
  }
}