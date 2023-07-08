import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Product } from 'src/app/shared/types/products.types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products'

  constructor(
    private http: HttpClient
  ) { }

  getProducts() {
    return this.http.get(this.apiUrl);
  }

  sendProduct(data: Product) {
    return this.http.post(this.apiUrl, data);
  }

  updateProduct(data: Product) {
    return this.http.put(this.apiUrl, data);
  }

  deleteProduct(data: Product) {
    return this.http.delete(this.apiUrl+'?id='+data.id);
  }
}
