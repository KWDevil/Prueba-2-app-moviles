import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/servicios/product.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  products: any[] = []; // aqui se almacenan los productos
  skip: number = 0; // indice
  limit: number = 30; // numero de productos a cargar

  constructor(private productService: ProductService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.cargarMasProductos(); // carga los productos al iniciar la pagina
  }

  cargarMasProductos(event?: any){
    // llama al servicio de productos 
    this.productService.getProducts(this.skip).subscribe(response =>{
      this.products = [...this.products, ...response.products]; // añade los productos al array
      this.skip += this.limit; // incrementa el indice para la proxima carga 
      if (event) {
        event.target.complete(); // finaliza el evento
      }  
    })
  }
  onLogout() {
    this.authService.logout(); // metodo para salir
    this.router.navigate(['/login']); // redireccion al login
  }

}
