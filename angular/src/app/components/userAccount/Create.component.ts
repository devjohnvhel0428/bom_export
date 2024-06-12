import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UserAccountService } from './UserAccount.service'
import { Util } from '../../util.service'

@Component({
  selector: 'userAccount-create',
  templateUrl: 'Create.component.html'
})
export class UserAccountCreate {
  
  userAccount?: any = {}
  roles?: any[]
  errors?: any = {}
  constructor(private router: Router, private route: ActivatedRoute, private UserAccountService: UserAccountService, public util: Util) { }
  
  ngOnInit() {
    this.get().add(() => {
      setTimeout(() => { this.util.initView(true) })
    })
  }

  get() {
    return this.UserAccountService.create().subscribe(data => {
      this.roles = data.roles
    })
  }

  create() {
    this.userAccount.role_id = Array.from(document.querySelectorAll('[name="role_id"]:checked')).map((e: any) => e.value)
    this.UserAccountService.create(this.userAccount).subscribe(() => {
      this.util.goBack('/userAccount')
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