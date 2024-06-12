import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AccessoryService } from './Accessory.service'
import { Util } from '../../util.service'
import * as moment from 'moment'

@Component({
  selector: 'accessory-delete',
  templateUrl: 'Delete.component.html'
})
export class AccessoryDelete {
  
  accessory?: any = {}
  constructor(private router: Router, private route: ActivatedRoute, private AccessoryService: AccessoryService, public util: Util) { }
  
  ngOnInit() {
    this.get().add(() => {
      setTimeout(() => { this.util.initView(true) })
    })
  }

  get() {
    return this.AccessoryService.delete(this.route.snapshot.params['id']).subscribe(data => {
      this.accessory = data.accessory
    })
  }

  delete() {
    this.AccessoryService.delete(this.route.snapshot.params['id'], this.accessory).subscribe(() => {
      this.util.goBack('/accessory')
    }, (e) => {
      alert(e.error.message)
    })
  }

  formatDate(date:Date, style:string) {
    return (typeof date === 'string') ? moment(date).format(style) : '';
  }
}