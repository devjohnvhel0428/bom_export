import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AccessoryService } from './Accessory.service'
import { Util } from '../../util.service'
import * as moment from 'moment'

@Component({
  selector: 'accessory-detail',
  templateUrl: 'Detail.component.html'
})
export class AccessoryDetail {
  
  accessory?: any = {}
  constructor(private route: ActivatedRoute, private AccessoryService: AccessoryService, public util: Util) { }
  
  ngOnInit() {
    this.get().add(() => {
      setTimeout(() => { this.util.initView(true) })
    })
  }

  get() {
    return this.AccessoryService.get(this.route.snapshot.params['id']).subscribe(data => {
      this.accessory = data.accessory
    })
  }

  formatDate(date:Date, style:string) {
    return (typeof date === 'string') ? moment(date).format(style) : '';
  }
}