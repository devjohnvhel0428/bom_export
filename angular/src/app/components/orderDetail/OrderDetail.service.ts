import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class OrderDetailService {

  constructor(private http: HttpClient) { }

  get(orderId?: any, no?: any): Observable<any> {
    if (orderId) {
      return this.http.get(`/orderDetails/${orderId}/${no}`)
    }
    else {
      return this.http.get('/orderDetails' + location.search)
    }
  }

  create(data?: any): Observable<any> {
    if (data) {
      return this.http.post('/orderDetails', data)
    }
    else {
      return this.http.get('/orderDetails/create')
    }
  }

  edit(id: any, data?: any): Observable<any> {
    if (data) {
      return this.http.put(`/orderDetails/${id}`, data)
    }
    else {
      return this.http.get(`/orderDetails/${id}/edit`)
    }
  }

  delete(id: any, data?: any): Observable<any> {
    if (data) {
      return this.http.delete(`/orderDetails/${id}`)
    }
    else {
      return this.http.get(`/orderDetails/${id}/delete`)
    }
  }
}