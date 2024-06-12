import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { UserAccountService } from './UserAccount.service'
import { Util } from '../../util.service'

@Component({
  selector: 'userAccount-detail',
  templateUrl: 'Detail.component.html'
})
export class UserAccountDetail {
  
  userAccount?: any = {}
  userAccountUserRoles?: any[]
  constructor(private route: ActivatedRoute, private UserAccountService: UserAccountService, public util: Util) { }
  
  ngOnInit() {
    this.get().add(() => {
      setTimeout(() => { this.util.initView(true) })
    })
  }

  get() {
    return this.UserAccountService.get(this.route.snapshot.params['id']).subscribe(data => {
      this.userAccount = data.userAccount
      this.userAccountUserRoles = data.userAccountUserRoles
    })
  }
}