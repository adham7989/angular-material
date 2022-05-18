import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http : HttpClient) {}

  public url = "http://localhost:3000/productList" ;  

    
  addProduct(data : any){
    return this.http.post<any>(`${this.url}` , data);
  }

  getProduct(){
    return this.http.get<any>(`${this.url}`);
  }

  updateProduct( data : any , id : number ){
    let api_url = `${this.url}/${id}`
    return this.http.put(`${api_url}`,data);
  }

  deleteProduct( id : number ){ 
    let api_url = `${this.url}/${id}`; 
    return this.http.delete<any>(`${api_url}`); 
  }

}
