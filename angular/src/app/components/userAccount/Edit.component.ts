import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UserAccountService } from './UserAccount.service'
import { Util } from '../../util.service'

@Component({
  selector: 'userAccount-edit',
  templateUrl: 'Edit.component.html'
})
export class UserAccountEdit {
  
  userAccount?: any = {}
  userAccountUserRoles?: any[]
  roles?: any[]
  errors?: any = {}
  constructor(private router: Router, private route: ActivatedRoute, private UserAccountService: UserAccountService, public util: Util) { }
  
  ngOnInit() {
    this.get().add(() => {
      setTimeout(() => { this.util.initView(true) })
    })
  }

  get() {
    return this.UserAccountService.edit(this.route.snapshot.params['id']).subscribe(data => {
      this.userAccount = data.userAccount
      this.userAccountUserRoles = data.userAccountUserRoles
      this.roles = data.roles
    })
  }

  edit() {
    if (!this.util.validateForm()) {
      return
    }
    this.userAccount.role_id = Array.from(document.querySelectorAll('[name="role_id"]:checked')).map((e: any) => e.value)
    this.UserAccountService.edit(this.route.snapshot.params['id'], this.userAccount).subscribe(() => {
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

  userAccountUserRolesChecked(key: string, value: any) { //https://github.com/angular/angular/issues/14129
    return this.userAccountUserRoles?.some(e => e[key] == value)
  }
}