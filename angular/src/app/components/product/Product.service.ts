import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient) { }

  get(id?: any): Observable<any> {
    if (id) {
      return this.http.get(`/products/${id}`)
    }
    else {
      return this.http.get('/products' + location.search)
    }
  }

  getAll(id?: any): Observable<any> {
      return this.http.get(`/products/all`)
  }

  create(data?: any): Observable<any> {
    if (data) {
      return this.http.post('/products', data)
    }
    else {
      return this.http.get('/products/create')
    }
  }

  getSelected(data?: any): Observable<any> {
      return this.http.post('/products/selected', data)
  }

  edit(id: any, data?: any): Observable<any> {
    if (data) {
      return this.http.put(`/products/${id}`, data)
    }
    else {
      return this.http.get(`/products/${id}/edit`)
    }
  }

  delete(id: any, data?: any): Observable<any> {
    if (data) {
      return this.http.delete(`/products/${id}`)
    }
    else {
      return this.http.get(`/products/${id}/delete`)
    }
  }
}