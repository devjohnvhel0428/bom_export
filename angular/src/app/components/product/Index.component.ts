import { Component } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { ProductService } from './Product.service'
import { OrderHeaderService } from '../orderHeader/OrderHeader.service'
import { Util } from '../../util.service'
import { Subscription, Observable, forkJoin } from 'rxjs'
import { map } from 'rxjs/operators';
import * as moment from 'moment'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'product-index',
  templateUrl: 'index.component.html'
})

export class ProductIndex {

  products?: any[]
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
    this.ProductService.get().subscribe(data => {
      this.products = data.products
      this.products?.map((product) => {
        product.selected = false
        if (this.selectedAll) {
          product.selected = true
        }
        let exist = this.selectedItems.some(item => item.id == product.id);
        if (exist) {
          product.selected = true
        }
        this.OrderHeaderService.getFromProduct(product.id).subscribe(data => {
          if(data.orderHeaderOrderDetails?.length>0) {
            product.detailLength = data.orderHeaderOrderDetails?.length
          }
        })
        return product
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

  formatDate(date: Date, style: string) {
    return (typeof date === 'string') ? moment(date).format(style) : '';
  }

  isJsonString(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  selectBOM(id: any) {
    if (id == 'all') {
      this.selectedAll = !this.selectedAll
      if (this.selectedAll) {
        this.products?.map((product) => {
          product.selected = true
          return product
        })
        this.getAll()
      } else {
        this.products?.map((product) => {
          product.selected = false
          return product
        })
        this.selectedItems = new Array()
      }
    } else {
      this.products?.map((product) => {
        if (product.id == id) {
          product.selected = !product.selected
          if (!product.selected) {
            this.selectedAll = false
            this.selectedItems = this.selectedItems.filter(item => item.id !== id)
            // }
          } else {
            this.selectedItems.push({ id: id })
          }
        }
        return product
      })
    }
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

   goToBom(id: number) {
    this.router.navigate([`/bomHeader/edit/${id}`])
   }
}