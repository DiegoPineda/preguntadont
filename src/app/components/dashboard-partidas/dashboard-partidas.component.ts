import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard-partidas',
  templateUrl: './dashboard-partidas.component.html',
  styleUrls: ['./dashboard-partidas.component.css']
})
export class DashboardPartidasComponent {
  constructor(private router: Router) {}

  irAPlay() {
    this.router.navigate(['/partida']);
  }

}
