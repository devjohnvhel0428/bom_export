import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { OrderHeaderService } from './OrderHeader.service'
import { Util } from '../../util.service'

@Component({
  selector: 'orderHeader-delete',
  templateUrl: 'Delete.component.html'
})
export class OrderHeaderDelete {
  
  orderHeader?: any = {}
  orderHeaderOrderDetails?: any[]
  constructor(private router: Router, private route: ActivatedRoute, private OrderHeaderService: OrderHeaderService, public util: Util) { }
  
  ngOnInit() {
    this.get().add(() => {
      setTimeout(() => { this.util.initView(true) })
    })
  }

  get() {
    return this.OrderHeaderService.delete(this.route.snapshot.params['id']).subscribe(data => {
      this.orderHeader = data.orderHeader
      this.orderHeaderOrderDetails = data.orderHeaderOrderDetails
    })
  }

  delete() {
    this.OrderHeaderService.delete(this.route.snapshot.params['id'], this.orderHeader).subscribe(() => {
      this.util.goBack('/bomHeader')
    }, (e) => {
      alert(e.error.message)
    })
  }
}