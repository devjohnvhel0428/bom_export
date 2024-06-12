import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AccessoryService } from './Accessory.service'
import { Util } from '../../util.service'

@Component({
  selector: 'accessory-create',
  templateUrl: 'Create.component.html'
})
export class AccessoryCreate {
  
  accessory?: any = {}
  errors?: any = {}
  constructor(private router: Router, private route: ActivatedRoute, private AccessoryService: AccessoryService, public util: Util) { }
  
  ngOnInit() {
    this.util.initView(true)
  }

  create() {
    this.AccessoryService.create(this.accessory).subscribe(() => {
      this.util.goBack('/accessory')
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