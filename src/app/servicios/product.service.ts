import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/auth/products';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getProducts(skip: number = 0): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
    return this.http.get(`${this.apiUrl}?skip=${skip}`, { headers }); // Usa `${this.apiUrl}` para incluir la variable correctamente
  }
}
