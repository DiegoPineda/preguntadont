import { Component } from '@angular/core';
import { Productos } from 'src/app/interfaces/interfaces';
import { TiendaService } from 'src/app/services/tienda.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent {

  constructor(private tiendaService: TiendaService){
  }

  listaProductos: Productos[] | undefined = []; 

  ngOnInit(): void{
    this.mostrarProductos(); 
  }

  async mostrarProductos(){
    this.listaProductos = await this.tiendaService.getProductos();
    console.log(this.listaProductos);
  }

}
