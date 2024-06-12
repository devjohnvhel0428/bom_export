import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { OrderHeaderService } from './OrderHeader.service'
import { Util } from '../../util.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'orderHeader-edit',
  templateUrl: 'Edit.component.html'
})
export class OrderHeaderEdit {

  orderHeader?: any = {}
  orderHeaderOrderDetails?: any[]
  products?: any[]
  errors?: any = {}
  constructor(private router: Router, private route: ActivatedRoute, private toastr: ToastrService, private OrderHeaderService: OrderHeaderService, public util: Util) { }

  ngOnInit() {
    this.get().add(() => {
      setTimeout(() => { this.util.initView(true) })
    })
  }

  get() {
    return this.OrderHeaderService.edit(this.route.snapshot.params['id']).subscribe(data => {
      this.orderHeader = data.orderHeader
      this.orderHeaderOrderDetails = data.orderHeaderOrderDetails
      this.products = data.products
    })
  }

  edit() {
    this.OrderHeaderService.edit(this.route.snapshot.params['id'], this.orderHeader).subscribe(() => {
      this.util.goBack('/bomHeader')
    }, (e) => {
      if (e.error.errors) {
        this.errors = e.error.errors
      }
      else {
        alert(e.error.message)
      }
    })
  }

  onExcelImport(event: any) {
    let data = { ...this.orderHeader }
    data.excel = event.target.files[0]
    data = this.util.getFormData(data)
    this.OrderHeaderService.excelImport(data).subscribe(() => {
      this.toastr.success("Successfully imported!")
      this.get()
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