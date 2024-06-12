import { Component } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Location } from '@angular/common'
import { Router, RouterOutlet, NavigationEnd } from '@angular/router'
import { Subscription } from 'rxjs'
import { User } from './user.service'
import { Util } from './util.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {

  isReady = false
  isSearch = true
  url: any
  routerEvents?: Subscription
  constructor(private router: Router, private http: HttpClient, public location: Location, public user: User, public util: Util) { }

  ngOnInit() {
    this.url = location
    this.util.setHistory()
    this.routerEvents = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.router.getCurrentNavigation()?.previousNavigation) {
          this.util.setHistory()
        }
      }
    })
    this.http.get('/user').subscribe(data => {
      this.user.setUser(data)
      this.isReady = true
    }, error => {
      this.isReady = true
    })
  }
  ngOnDestroy() {
    this.routerEvents?.unsubscribe()
  }
  onActivate(outlet: RouterOutlet) {
    this.isSearch = outlet.activatedRoute.component!.name.endsWith('Index')
  }
}