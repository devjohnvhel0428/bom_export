import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AccessoryService } from './Accessory.service'
import { Util } from '../../util.service'

@Component({
  selector: 'accessory-edit',
  templateUrl: 'Edit.component.html'
})
export class AccessoryEdit {
  
  accessory?: any = {}
  errors?: any = {}
  constructor(private router: Router, private route: ActivatedRoute, private AccessoryService: AccessoryService, public util: Util) { }
  
  ngOnInit() {
    this.get().add(() => {
      setTimeout(() => { this.util.initView(true) })
    })
  }

  get() {
    return this.AccessoryService.edit(this.route.snapshot.params['id']).subscribe(data => {
      this.accessory = data.accessory
    })
  }

  edit() {
    this.AccessoryService.edit(this.route.snapshot.params['id'], this.accessory).subscribe(() => {
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