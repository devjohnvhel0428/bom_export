import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { User } from '../../user.service'

@Component({
  selector: 'login',
  templateUrl: 'Login.component.html',
  styleUrls: ['Login.component.scss']
})
export class Login {

  user: any = {}
  error: any = {}
  constructor(private http: HttpClient, private router: Router, private userService: User) { }

  ngOnInit() {
    if (this.userService.getUser()) {
      this.router.navigateByUrl(history.state.redirect || '/product')
    }
  }

  login() {
    this.http.post('/login', this.user).subscribe((data: any) => {
      this.userService.setUser(data.user)
      localStorage.setItem('express_token', data.token)
    }, e => {
      this.error = e.error
    })
  }
}