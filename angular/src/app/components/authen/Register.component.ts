import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { User } from '../../user.service'

@Component({
  selector: 'register',
  templateUrl: 'Register.component.html',
  styleUrls: ['Register.component.scss']

})
export class Register {

  user: any = {}
  error: any = {}
  success: any = {}
  constructor(private http: HttpClient, private router: Router, private userService: User) { }

  ngOnInit() {
    if (this.userService.getUser()) {
      this.router.navigateByUrl(history.state.redirect || '/product')
    }
  }

  register() {
    this.http.post('/register', this.user).subscribe((data: any) => {
      this.success = data;
    }, e => {
      this.error = e.error
    })
  }
}