import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class AccessoryService {

  constructor(private http: HttpClient) { }

  get(id?: any): Observable<any> {
    if (id) {
      return this.http.get(`/accessory/${id}`)
    }
    else {
      return this.http.get('/accessory' + location.search)
    }
  }

  getSimilar(name?: any, value?: any): Observable<any> {
    return this.http.get(`/accessory/similar/${name}/${value}`)
  }

  create(data?: any): Observable<any> {
    if (data) {
      return this.http.post('/accessory', data)
    }
    else {
      return this.http.get('/accessory/create')
    }
  }

  edit(id: any, data?: any): Observable<any> {
    if (data) {
      return this.http.put(`/accessory/${id}`, data)
    }
    else {
      return this.http.get(`/accessory/${id}/edit`)
    }
  }

  delete(id: any, data?: any): Observable<any> {
    if (data) {
      return this.http.delete(`/accessory/${id}`)
    }
    else {
      return this.http.get(`/accessory/${id}/delete`)
    }
  }
}