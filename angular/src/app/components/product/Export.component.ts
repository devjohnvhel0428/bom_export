import { Component } from '@angular/core'
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router'
import { ProductService } from './Product.service'
import { OrderHeaderService } from '../orderHeader/OrderHeader.service';
import { AccessoryService } from '../accessory/Accessory.service';
import { Util } from '../../util.service'
import { Subscription } from 'rxjs'
import * as moment from 'moment'
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'product-export',
    templateUrl: 'Export.component.html'
})

export class ExportProduct {

    products = new Array()
    accessories?: any[]
    selectedProduct?: any = null
    paging = {
        current: 1,
        size: 1,
        last: 1
    }
    selectedItems = new Array()
    routerEvents?: Subscription
    orderHeader?: any = {}
    selectedDetail = new Array()
    tempData = new Array()
    exportData = new Array()
    selected = 0
    selectedAccessoryIndex = 0
    selectedAccessory: any
    errors?: any = {}
    constructor(public router: Router, private ProductService: ProductService, private toastr: ToastrService, private AccessoryService: AccessoryService, private OrderHeaderService: OrderHeaderService, public util: Util) { }

    ngOnInit() {
        let params = new URLSearchParams(window.location.search);
        let encodedParam = params.get('data'); // Replace 'param' with the name of your parameter
        let decodedParam = decodeURIComponent(encodedParam ?? '');
        this.selectedItems = JSON.parse(decodedParam);
        this.get()
    }

    ngOnDestroy() {
        this.routerEvents?.unsubscribe()
    }

    get() {
        const formData = new FormData()
        this.selectedItems.forEach((value, index) => {
            formData.append(`product[${index}]`, value.id)
        })
        this.ProductService.getSelected(formData).subscribe(data => {
            this.products = data.products
            this.products?.map((product) => {
                product.qty = 1
                this.OrderHeaderService.getFromProduct(product.id).subscribe(data => {
                    this.exportData?.push(data.orderHeaderOrderDetails)
                    this.tempData?.push(data.orderHeaderOrderDetails)
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

    formatDate(date: Date, style: string) {
        return (typeof date === 'string') ? moment(date).format(style) : ''
    }

    isJsonString(str: string) {
        try {
            JSON.parse(str)
        } catch (e) {
            return false
        }
        return true
    }

    selectProduct(product: any, index: number) {
        if (!this.selectedProduct) {
            this.selectedProduct = JSON.parse(JSON.stringify(product))
            this.selected = index
            this.exportData.forEach((element, i) => {
                if (index == i) {
                    this.selectedDetail = JSON.parse(JSON.stringify(element))
                }
            });
        }
    }

    changeQty(i: number, event: any) {
        event.preventDefault()
        let count = event.target.value
        let buffer = new Array()
        this.tempData.forEach((element, index) => {
            if (i == index) {
                buffer = JSON.parse(JSON.stringify(element))
            }
        })
        buffer.forEach((element, index) => {
            let item = element
            item.qty = item.qty * count
            this.selectedDetail[index].qty = item.qty
        })
        this.selectedProduct.qty = count
    }

    cancelDetail() {
        this.selectedDetail = []
        this.selectedProduct = null
        this.selected = 0
        this.selectedAccessoryIndex = 0
        this.selectedAccessory = null
    }

    confirmDetail() {
        this.exportData[this.selected] = JSON.parse(JSON.stringify(this.selectedDetail))
        this.products[this.selected] = JSON.parse(JSON.stringify(this.selectedProduct))
        this.selectedDetail = []
        this.selectedProduct = null
        this.selected = 0
        this.selectedAccessoryIndex = 0
        this.selectedAccessory = null
    }

    selectDetail(index: number, detail: any) {
        this.selectedAccessoryIndex = index
        this.selectedAccessory = JSON.parse(JSON.stringify(this.selectedDetail[index]));
        this.AccessoryService.getSimilar(detail.footprint, detail.value).subscribe(data => {
            this.selectedAccessory.similar = data.accessories;
            this.selectedDetail[index] = JSON.parse(JSON.stringify(this.selectedAccessory));
        });
    }

    changeAccessory(index: number, event: any) {
        event.preventDefault()
        let selectedIndex = event.target.value
        let qty = this.selectedDetail[index].qty
        this.selectedDetail[index] = JSON.parse(JSON.stringify(this.selectedAccessory.similar[selectedIndex]))
        this.selectedDetail[index].id = this.exportData[this.selected][index].id
        this.selectedDetail[index].accessory_id = this.selectedAccessory.similar[selectedIndex].id
        this.selectedDetail[index].designators = this.exportData[this.selected][this.selectedAccessoryIndex].designators
        this.selectedDetail[index].qty = qty
    }

    export() {
        let data = JSON.stringify(this.exportData)
        const formData = new FormData()
        formData.append(`data`, data)
        this.OrderHeaderService.export(formData).subscribe((data) => {
            window.open(data.link, '_blank')
            this.toastr.success('Successfully Exported!')
            this.router.navigate([`/product`])
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