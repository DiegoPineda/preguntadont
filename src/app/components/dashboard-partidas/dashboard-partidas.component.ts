import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PartidaService } from 'src/app/services/partida.service';


@Component({
  selector: 'app-dashboard-partidas',
  templateUrl: './dashboard-partidas.component.html',
  styleUrls: ['./dashboard-partidas.component.css']
})
export class DashboardPartidasComponent {
  constructor(private router: Router, private partidaService:PartidaService) {}

  ngOnInit():void{
    
  }
  irAPlay() {
    
    this.partidaService.crearPartida();
    
  }

  
}
