import { Component } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { OrderHeaderService } from './OrderHeader.service'
import { ProductService } from '../product/Product.service'
import { Util } from '../../util.service'
import { Subscription, Observable, forkJoin } from 'rxjs'
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'orderHeader-index',
  templateUrl: 'Index.component.html'
})

export class OrderHeaderIndex {

  orderHeaders?: any[]
  paging = {
    current: 1,
    size: 1,
    last: 1
  }
  selectedAll = false
  selectedItems = new Array()
  routerEvents?: Subscription
  constructor(public router: Router, private OrderHeaderService: OrderHeaderService, private toastr: ToastrService, private ProductService: ProductService, public util: Util) { }

  ngOnInit() {
    this.util.initView()
    this.get()
    this.routerEvents = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.router.getCurrentNavigation()?.previousNavigation) {
          this.get()
        }
      }
    })
  }

  ngOnDestroy() {
    this.routerEvents?.unsubscribe()
  }

  get() {
    this.OrderHeaderService.get().subscribe(data => {
      this.orderHeaders = data.orderHeaders
      this.orderHeaders?.map((orderHeader) => {
        orderHeader.selected = false
        if (this.selectedAll) {
          orderHeader.selected = true
        }
        let exist = this.selectedItems.some(item => item.id == orderHeader.id);
        if (exist) {
          orderHeader.selected = true
        }
        this.OrderHeaderService.getFromProduct(orderHeader.product_id).subscribe(data => {
          if(data.orderHeaderOrderDetails?.length>0) {
            orderHeader.detailLength = data.orderHeaderOrderDetails?.length
          }
        })
        return orderHeader
      })
      let query = this.util.getQuery()
      this.paging = {
        current: parseInt(query.page) || 1,
        size: parseInt(query.size) || 10,
        last: data.last
      }
    }, e => {
      alert(e.error.message)
    })
  }

  getAll() {
    this.ProductService.getAll().subscribe(data => {
      this.selectedItems = data.products
    }, e => {
      alert(e.error.message)
    })
  }

  selectBOM(id: any) {
    if (id == 'all') {
      this.selectedAll = !this.selectedAll
      if (this.selectedAll) {
        this.orderHeaders?.map((orderHeader) => {
          orderHeader.selected = true
          return orderHeader
        })
        this.getAll()
      } else {
        this.orderHeaders?.map((orderHeader) => {
          orderHeader.selected = false
          return orderHeader
        })
        this.selectedItems = new Array()
      }
    } else {
      this.orderHeaders?.map((orderHeader) => {
        if (orderHeader.product_id == id) {
          orderHeader.selected = !orderHeader.selected
          if (!orderHeader.selected) {
            this.selectedAll = false
            this.selectedItems = this.selectedItems.filter(item => item.id !== id)
            // }
          } else {
            this.selectedItems.push({ id: id })
          }
        }
        return orderHeader
      })
    }
  }

  isJsonString(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  
  checkItems(): Observable<any[]> {
    let buffer: any[] = []
    const observables = this.selectedItems?.map(item => 
      new Observable<void>((subscriber) => {
        this.OrderHeaderService.getFromProduct(item.id).subscribe(data => {
          if(data.orderHeaderOrderDetails?.length > 0) {
            buffer.push(item)
          }
          subscriber.next() // Emit a value when the HTTP request completes
          subscriber.complete() // Complete the Observable
        })
      })
    ) || []
    // Combine all Observables into one using forkJoin
    return forkJoin(observables).pipe(map(() => buffer))
  }
  
  goToExport() {
   let items = this.selectedItems
    this.checkItems().subscribe(buffer => {
      this.selectedItems = buffer as any[]
      if((items.length) == (this.selectedItems.length)) {
        let encodedParam = encodeURIComponent(JSON.stringify(this.selectedItems))
        this.router.navigate(['/export'], { queryParams: { data: encodedParam } })
      } else {
        this.toastr.warning(`Un-edited products was inlcuded. Edit them at first before export!`)
      }
    })
  }
  


}